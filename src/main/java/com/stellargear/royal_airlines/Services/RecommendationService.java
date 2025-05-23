package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.Entities.Recommendation;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import com.stellargear.royal_airlines.Models.Utils.RecommendationResult;
import com.stellargear.royal_airlines.Repositories.RecommendationRepository;
import com.stellargear.royal_airlines.Utils.ClassifierUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.classifiers.Classifier;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final LocationService locationService;
    private final ClassifierUtils classifierUtils;
    private static final Logger logger = Logger.getLogger(RecommendationService.class.getName());

    private Classifier classifier;
    private Instances dataStructure;


    public RecommendationService(RecommendationRepository recommendationRepository, LocationService locationService, ClassifierUtils classiferUtils) {

        this.recommendationRepository = recommendationRepository;
        this.locationService = locationService;
        this.classifierUtils = classiferUtils;

        try {
            ClassPathResource modelResource = new ClassPathResource("J48Model.model");
            classifier = (Classifier) weka.core.SerializationHelper.read(modelResource.getInputStream());
            logger.info("IBk Model initialized");

            ClassPathResource arffResource = new ClassPathResource("TravelDestinationsDataset.arff");
            DataSource source = new DataSource(arffResource.getInputStream());
            dataStructure = source.getDataSet();
            dataStructure.setClassIndex(dataStructure.numAttributes() - 1);
            logger.info("Arff file initialized");

        } catch (Exception e) {
            logger.severe("Error starting Recommendation Service: " + e.getMessage());
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

        double[] distribution = classifier.distributionForInstance(instance);
        List<RecommendationResult> topResults = classifierUtils.getTopProbabilities(distribution, dataStructure.classAttribute(), 3);

        Recommendation recommendation = generateRecommendation(userID.isEmpty() ? "Guest" : userID, topResults);
        logger.info("Recommendation for user: " + userID + " successfully generated");
        return recommendation;
    }


    @Transactional(propagation = Propagation.REQUIRED)
    public Recommendation generateRecommendation (String userID, List<RecommendationResult> results) {
        Recommendation recommended = new Recommendation();
        List<String> recommendations = new ArrayList<>();
        List<String> locationsIDs = new ArrayList<>();
        List<Double> confidences = new ArrayList<>();

        for (RecommendationResult result : results) {
            recommendations.add(result.getLocation());
            confidences.add(result.getProbability());
        }

        for (String recommendation : recommendations) {
            locationsIDs.add(locationService.searchDestination(recommendation));
        }

        recommended.setRecommendations(recommendations);
        recommended.setUserID(userID);
        recommended.setLocationIDs(locationsIDs);
        recommended.setConfidences(confidences);

        recommendationRepository.save(recommended);
        return recommended;
    }
}
