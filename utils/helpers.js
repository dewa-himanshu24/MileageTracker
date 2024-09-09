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
  
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' };
  
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    return formattedDate.replace(/ /g, "'").replace(",", ", ");
  }

  validateOdometerReading = (selectedVehicle, newStartReading) => {
    const refuellings = selectedVehicle.refuellings;
  
    if (refuellings.length === 0) {
      return true;
    }
  
    // Sort refuellings by refuelling date to get the most recent one
    const latestRefuelling = refuellings.sort((a, b) => new Date(b.refuellingDate) - new Date(a.refuellingDate))[0];
  
    // Get the latest endReading from the most recent refuelling
    const lastEndReading = parseInt(latestRefuelling.endReading, 10);
  
    if (newStartReading > lastEndReading) {
      console.log("New start reading is greater than the last end reading", true);
      return true;
    } else {
      console.log("New start reading is less than or equal to the last end reading", false);
      return false; 
    }
  };
  
}

export default new Helpers();
