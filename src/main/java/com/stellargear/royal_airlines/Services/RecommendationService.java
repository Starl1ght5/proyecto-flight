package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.Entities.Recommendation;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import com.stellargear.royal_airlines.Repositories.ModelDataRepository;
import com.stellargear.royal_airlines.Repositories.RecommendationRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.classifiers.Classifier;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final ModelDataRepository modelDataRepository;
    private final LocationService locationService;
    private static final Logger LOGGER = Logger.getLogger(RecommendationService.class.getName());

    private Classifier classifier;
    private Instances dataStructure;

    public RecommendationService(RecommendationRepository recommendationRepository, ModelDataRepository modelDataRepository, LocationService locationService) {

        this.recommendationRepository = recommendationRepository;
        this.modelDataRepository = modelDataRepository;
        this.locationService = locationService;

        try {
            ClassPathResource modelResource = new ClassPathResource("J48Model.model");
            classifier = (Classifier) weka.core.SerializationHelper.read(modelResource.getInputStream());
            LOGGER.info("Model initialized");

            ClassPathResource arffResource = new ClassPathResource("TravelDestinationsDataset.arff");
            DataSource source = new DataSource(arffResource.getInputStream());
            dataStructure = source.getDataSet();
            dataStructure.setClassIndex(dataStructure.numAttributes() - 1);
            LOGGER.info("Arff file initialized");

        } catch (Exception e) {
            LOGGER.severe("Error starting Recommendation Service: " + e.getMessage());
            throw new RuntimeException("Recommendation Service failed to initialize", e);
        }
    }

    public Recommendation recommendDestination(ModelData data, String userID) throws Exception {

        Instance instance = new DenseInstance(14);
        instance.setDataset(dataStructure);
        instance.setValue(0, data.getPrice());
        instance.setValue(1, data.getTemperature());
        instance.setValue(2, data.getPopularity());
        instance.setValue(3, data.getBeach());
        instance.setValue(4, data.getMountain());
        instance.setValue(5, data.getJungle());
        instance.setValue(6, data.getDesert());
        instance.setValue(7, data.getHistoric());
        instance.setValue(8, data.getCultural());
        instance.setValue(9, data.getGastronomic());
        instance.setValue(10, data.getNight_life());
        instance.setValue(11, data.getEco_tourism());
        instance.setValue(12, data.getAdventure());

        double predictionValue = classifier.classifyInstance(instance);
        String prediction = dataStructure.classAttribute().value((int) predictionValue);
        double[] probabilities = classifier.distributionForInstance(instance);
        double confidence = probabilities[(int) predictionValue];
        DecimalFormat df = new DecimalFormat("#.#");
        String confidencePercentage = df.format(confidence * 100) + "%";

        data.setResult(prediction);
        modelDataRepository.save(data);

        if (userID.isEmpty()) {
            userID = "Guest";
        }

        Recommendation recommendation = generateRecommendation(userID, confidencePercentage, prediction);
        recommendationRepository.save(recommendation);
        LOGGER.info("Recommendation for user: " + userID + " successfully generated");
        return recommendation;
    }

    public Recommendation generateRecommendation (String userID, String confidence, String recommendation) {
        Recommendation recommended = new Recommendation();

        recommended.setRecommendation(recommendation);
        recommended.setUserID(userID);
        recommended.setLocationID(locationService.searchDestination(recommendation));
        recommended.setConfidence(confidence);

        return recommended;
    }

    public List<Recommendation> searchRecommendationForUser (String userID) {
        return recommendationRepository.getRecommendedForUser(userID);
    }

}
