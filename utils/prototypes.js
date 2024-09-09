// Description: Prototypes for JavaScript objects.
if (!String.prototype.toProperCase) {
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
}
