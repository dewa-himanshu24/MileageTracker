

class VehicleServices {

  addVehicle = (payload) => {
    const { user, imageURI, vehicleName, engineCapacity, vehicleType, vehicle_id } = payload;

    // Find the highest existing vehicle_id
    const vehicleIds = Object.keys(user?.vehicles).map(id => parseInt(id, 10));
    const nextVehicleId = vehicleIds.length ? Math.max(...vehicleIds) + 1 : 1;

    // Create the new vehicle object
    const newVehicle = {
        vehicle_id,
        imageURI,
        vehicleName,
        engineCapacity,
        vehicleType,
        refuellings: []
    };

    // Add the new vehicle to the user's vehicles
    user.vehicles[vehicle_id] = newVehicle;
    return { user, vehicle: newVehicle };
  }

  validateFields = (vehicleName, engineCapacity, setVehicleNameError, setEngineCapacityError) => {
    let isValid = true;
  
    // Validate Vehicle Name
    if (!vehicleName.trim()) {
      setVehicleNameError("Vehicle Name is required.");
      return isValid = false;
    } else {
      setVehicleNameError("");
    }
  
    // Validate Engine Capacity
    if (engineCapacity === "" || engineCapacity === null || engineCapacity === undefined) {
      setEngineCapacityError("Engine Capacity is required.");
      return isValid = false;
    } else if (isNaN(engineCapacity) || Number(engineCapacity) <= 0) {
      setEngineCapacityError("Engine Capacity must be a positive number.");
      return isValid = false;
    } else {
      setEngineCapacityError("");
    }
  
    return isValid;
  };
  
}

export default new VehicleServices();