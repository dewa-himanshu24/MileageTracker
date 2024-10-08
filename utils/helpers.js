class Helpers {
  formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${day}/${month}/${year}`;
  };

  formatDateType2 = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate.replace(/ /g, "'").replace(",", ", ");
  };

  validateOdometerReading = (
    selectedVehicle,
    newStartReading,
    newEndReading,
    refuellingId
  ) => {
    const refuellings = selectedVehicle?.refuellings || [];

    if (refuellings?.length === 0) {
      return true;
    }

    // Sort refuellings by refuelling date to get the most recent one
    const latestRefuelling = refuellings.sort(
      (a, b) => new Date(b.refuellingDate) - new Date(a.refuellingDate)
    )[0];

    // Get the latest endReading from the most recent refuelling
    const lastEndReading = parseInt(latestRefuelling.endReading, 10);

    if (Number(newEndReading) <= Number(newStartReading)) {
      alert("End reading must be greater than the start reading");
      return false;
    }


    if (newStartReading >= lastEndReading) {
      return true;
    } else {
      if (refuellingId === "new") {
        alert(
          `The start reading you entered (${newStartReading} km) is lower than your last recorded end reading of ${lastEndReading} km. Please enter a start reading greater than ${lastEndReading} km.`
        );
        return false;
      } else {
        return true;
      }
    }
  };

  calculateFuelConsumption(refuellings) {
    let totalMileage = 0;
    const totalRefuellings = refuellings.length;

    let lastFuelConsumption = null;

    refuellings.forEach((refuel) => {
      const startReading = parseFloat(refuel.startReading);
      const endReading = parseFloat(refuel.endReading);
      const consumed = parseFloat(refuel.consumed);

      // Calculate mileage for each refuelling
      const mileage = (endReading - startReading) / consumed;
      totalMileage += mileage;

      lastFuelConsumption = mileage;
    });

    const averageFuelConsumption = totalMileage / totalRefuellings;

    return {
      averageFuelConsumption: averageFuelConsumption?.toFixed(2),
      lastFuelConsumption: lastFuelConsumption?.toFixed(2),
    };
  }
}

export default new Helpers();
