const calculateUrgency = (availableUntil) => {
  const currentTime = new Date();
  const expiryTime = new Date(availableUntil);

  const timeDifference =
    expiryTime - currentTime;

  // Already expired
  if (timeDifference <= 0) {
    return {
      level: "EXPIRED",
      label: "Expired",
      minutesRemaining: 0
    };
  }

  const minutesRemaining =
    timeDifference / (1000 * 60);

  // Less than 30 minutes
  if (minutesRemaining <= 30) {
    return {
      level: "CRITICAL",
      label: "Critical",
      minutesRemaining: Math.round(minutesRemaining)
    };
  }

  // 30 to 60 minutes
  if (minutesRemaining <= 60) {
    return {
      level: "URGENT",
      label: "Urgent",
      minutesRemaining: Math.round(minutesRemaining)
    };
  }

  // 1 to 3 hours
  if (minutesRemaining <= 180) {
    return {
      level: "SOON",
      label: "Soon",
      minutesRemaining: Math.round(minutesRemaining)
    };
  }

  // More than 3 hours
  return {
    level: "NORMAL",
    label: "Normal",
    minutesRemaining: Math.round(minutesRemaining)
  };
};

module.exports = {
  calculateUrgency
};