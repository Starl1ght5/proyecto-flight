/**
 * MODELO DE INVESTIGACIÓN DE OPERACIONES
 * Función objetivo:
 * Minimizar la huella de carbono generada por los vuelos del usuario
 *
 * Z = Σ (distancia_vuelo × factor_emisión × número_vuelos)
 */

export const EMISSION_FACTOR = 0.115; 

export function calcularHuellaCarbono(
  distanciaKm: number,
  vuelos: number = 1
): number {
  // Retornamos un número con máximo 2 decimales para evitar el ruido visual
  return parseFloat((distanciaKm * vuelos * EMISSION_FACTOR).toFixed(2));
}