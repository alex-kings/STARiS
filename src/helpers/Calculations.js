const Calc = {
  /**
   * Takes an array of data from one subgroup and an array of data of the matching subgroup
   * Returns Cg for these matching subgroups.
   */
  calculateCg(dx, Cg, Tg, nCg, nTg) {
    let A = 0,
      B = 0,
      C = 0,
      D = 0;
    Cg.forEach((n) => {
      A += n * n;
      C += n;
    });
    Tg.forEach((n) => {
      B += Math.pow(n + dx, 2);
      D += n + dx;
    });
    return A + B - Math.pow(C + D, 2) / (nCg + nTg);
  },

  //Returns the result of p function for the two given matching subgroups
  calculateP(dx, Cg, Tg, nCg, nTg) {
    return Math.pow(
      this.calculateCg(dx, Cg, Tg, nCg, nTg),
      -(nCg + nTg - 1) / 2
    );
  },

  //Takes an array of dx values and returns an array of p values for the given Cg and Tg
  getParray(dxArray, Cg, Tg) {
    const nCg = Cg.length;
    const nTg = Tg.length;
    const result = [];
    dxArray.forEach((dx) => {
      result.push(this.calculateP(dx, Cg, Tg, nCg, nTg));
    });
    return result;
  },

  /**
   * Gives P values for the given subgroups
   * @param {number[]} dxArray the array of dx values
   * @param {object} data the object containing subgroups data
   * @return {array[]} the P values for the different subgroups
   */
  getParrays(dxArray, data) {
    const matchingSubs = this.matchingSubgroups(data);
    const result = [];
    matchingSubs.forEach((element) => {
      result.push(
        //Need the normalized function
        this.normalized(
          /**
           *
           *
           * TEMP !!!!
           * Exchanged Cg and Tg!
           *
           *
           */
          this.getParray(dxArray, data[element[1]], data[element[0]])
        )
      );
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
    return Tg.slice(1) === Cg.slice(1);
  },

  /**
   * Normalizes an array along all its interval.
   * @param array an array of numbers
   * @returns the normalized array
   */
  normalized(array) {
    let C = 0;
    array.forEach((element) => {
      C += element;
    });
    let normalized = [];
    array.forEach((element) => {
      normalized.push(element / C);
    });
    return normalized;
  },

  // NEEDS TESTING
  /**
   * Gives the sum of the given arrays
   * @param arrays the arrays we want the sum of
   * @returns the sum
   */
  sumArrays(arrays) {
    let sum = [];
    // Gives "sum" the right dimensions
    arrays[0].forEach(() => {
      sum.push(0);
    });
    for (let i = 0; i < sum.length; i++) {
      arrays.forEach((array) => {
        sum[i] += array[i];
      });
    }
    return sum;
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

  //Calculates the integral between the given bounds, of the given function, numerically
  numericalIntegral(mathematicalFunction, lower, upper, n) {
    let dx = (upper - lower) / n;
    let integral = 0;
    for (let k = 1; k <= n; k++) {
      integral += mathematicalFunction(lower + dx * (k - 0.5));
    }
    return dx * integral;
  },
};

export { Calc };
