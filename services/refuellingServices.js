
class RefuellingServices {

  addRefuelling = (paylaod) => {
    const {user , vehicle, vehicle_id, refuelling_id, refuellingDate, startReading, endReading, consumed, price, createdAt} = paylaod;

    const newRefuelling = {
      vehicle_id,
      refuelling_id,
      refuellingDate,
      startReading,
      endReading,
      consumed,
      price,
      createdAt,
    };
    vehicle.refuellings.push(newRefuelling);
    user.vehicles[vehicle_id] = vehicle;
    console.log("Refuelling added successfully!");
    return { user: user, vehicle: vehicle, refuelling: newRefuelling };
  }

  updateRefuelling = (paylaod) => {
    const {user , vehicle, vehicle_id, refuelling_id, refuellingDate, startReading, endReading, consumed, price, createdAt} = paylaod;

    const newRefuelling = {
      vehicle_id,
      refuelling_id,
      refuellingDate,
      startReading,
      endReading,
      consumed,
      price,
      createdAt,
    };
  const updatedRefuellings = vehicle.refuellings?.map((refuelling, index) => {
    if (refuelling.refuelling_id === refuelling_id) {
      return newRefuelling;
    }
    return refuelling
  });


    user.vehicles[vehicle_id].refuellings = updatedRefuellings;
    console.log("Refuelling added successfully!");
    return { user: user, vehicle: user.vehicles[vehicle_id], refuelling: newRefuelling };
  }

}

export default new RefuellingServices();