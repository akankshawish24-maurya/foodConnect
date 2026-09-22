// Calculate smart matching score
const calculateMatchScore = ({
  foodQuantity,
  requiredQuantity,
  foodTypeMatch,
  distanceKm,
  availableUntil
}) => {

  let score = 0;


  // ==========================================
  // 1. QUANTITY MATCH - 30 POINTS
  // ==========================================

  if (foodQuantity >= requiredQuantity) {
    score += 30;
  } else if (foodQuantity >= requiredQuantity * 0.75) {
    score += 20;
  } else if (foodQuantity >= requiredQuantity * 0.5) {
    score += 10;
  }


  // ==========================================
  // 2. FOOD TYPE MATCH - 30 POINTS
  // ==========================================

  if (foodTypeMatch === true) {
    score += 30;
  }


  // ==========================================
  // 3. DISTANCE - 20 POINTS
  // ==========================================

  if (distanceKm <= 2) {
    score += 20;
  } else if (distanceKm <= 5) {
    score += 15;
  } else if (distanceKm <= 10) {
    score += 10;
  } else if (distanceKm <= 20) {
    score += 5;
  }


  // ==========================================
  // 4. AVAILABILITY - 20 POINTS
  // ==========================================

  const currentTime = new Date();
  const expiryTime = new Date(availableUntil);

  const timeDifference =
    expiryTime - currentTime;

  const hoursRemaining =
    timeDifference / (1000 * 60 * 60);


  if (hoursRemaining <= 1) {
    score += 20;
  } else if (hoursRemaining <= 3) {
    score += 15;
  } else if (hoursRemaining <= 6) {
    score += 10;
  } else {
    score += 5;
  }


  return score;
};


module.exports = {
  calculateMatchScore
};