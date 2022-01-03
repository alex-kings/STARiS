const Calc = {
  /**
   * Takes an array of data from one subgroup and an array of data of the matching subgroup
   * Returns Cg for these matching subgroups.
   */
  calculateCg(dx, Cg, Tg) {
    const nCg = Cg.length;
    const nTg = Tg.length;

    let A = 0;
    for (let i = 0; i < nCg; i++) {
      A += Math.pow(Cg[i], 2);
    }
    let B = 0;
    for (let j = 0; j < nTg; j++) {
      B += Math.pow(Tg[j] + dx, 2);
    }
    let C = 0;
    for (let i = 0; i < nCg; i++) {
      C += Cg[i];
    }
    let D = 0;
    for (let j = 0; j < nTg; j++) {
      D += Tg[j] + dx;
    }

    return A + B + Math.pow(C + D, 2) / (nCg + nTg);
  },

  //Returns the result of p function for the two given matching subgroups
  calculateP(dx, Cg, Tg) {
    return Math.pow(
      this.calculateCg(dx, Cg, Tg),
      -(Cg.length + Tg.length - 1) / 2
    );
  },

  //Takes an array of dx values and returns an array of p values for the given Cg and Tg
  getParray(dx, Cg, Tg) {
    const result = [];
    dx.forEach((element) => {
      result.push(this.calculateP(element, Cg, Tg));
    });
    return result;
  },

  /**
   * Gives P values for the given subgroups with dx values
   * @param {number[]} dx the array of dx values
   * @param {object} data the object containing subgroups data
   * @return {array[]} the P values for the different subgroups
   */
  getParrays(dx, data) {
    const matchingSubs = this.matchingSubgroups(data);
    const result = [];
    matchingSubs.forEach((element) => {
      result.push(this.getParray(dx, data[element[0]], data[element[1]]));
    });
    return result;
  },

  /**
   * Takes fileData and return an array of corresponding subrgroups keys names.
   * Ex: [[C-,T-],[C0,T0],[C+,T+]]
   */
  /**
   * Gives the matching subgroups
   * @param {object} fileData the subgroups data
   * @returns {string[]} array of subgroup names
   */
  matchingSubgroups(fileData) {
    const subgroups = [];
    const keys = Object.keys(fileData);
    while (keys.length > 1) {
      const key0 = keys.shift();
      let count = 0;
      keys.forEach((key) => {
        if (this.sameSubgroup(key0, key)) {
          if (count > 1) return null;
          count++;
          subgroups.push([key0, key]);
        }
      });
    }
    return subgroups;
  },

  //Checks if the two strings are the same after the first character
  sameSubgroup(Tg, Cg) {
    return Tg.slice(1) == Cg.slice(1);
  },

  //Calculates the integral between the given bounds, of the given function, numerically
  numericalIntegral(mathematicalFunction, lower, upper, n) {
    let dx = (upper - lower) / n;
    let integral = 0;
    for (let k = 1; k <= n; k++) {
      integral += mathematicalFunction(lower + dx * (k - 0.5));
    }
    return dx * integral;
  },

  //Returns an array starting and ending with given values, with a number of elements
  linspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(parseFloat((startValue + step * i).toFixed(2)));
    }
    return arr;
  },
};

export { Calc };