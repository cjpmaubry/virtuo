'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

function rentalPrice(car, days, distance){
  return days * car.pricePerDay + distance * car.pricePerKm;
};

function ComputeTimeComp(rental){
  var pickupDate = new Date(rental.pickupDate);
  var returnDate = new Date(rental.returnDate);
  var nbDays = (returnDate - pickupDate) / (1000 * 60 * 60 * 24) + 1;
   
    if (nbDays > 1 && nbDays <= 4)
    {
        return (nbDays * cars.find(x => x.id == rental.carId).pricePerDay)*0.9;
    }
    if (nbDays > 4 && nbDays <= 10)
    {
        return (nbDays * cars.find(x => x.id == rental.carId).pricePerDay)*0.7;
    }
    if (nbDays > 10)
    {
        return (nbDays * cars.find(x => x.id == rental.carId).pricePerDay) * 0.5;
    }
    else
        return nbDays * cars.find(x => x.id == rental.carId).pricePerDay;
};

function ComputePrice(actors) {
    return (rentals.find(x => x.id == actors.rentalId).price);
}

function ReturnDay(rental){
    var pickupDate = new Date(rental.pickupDate);
    var returnDate = new Date(rental.returnDate);
    var nbDays = (returnDate - pickupDate) / (1000 * 60 * 60 * 24) + 1;
    return nbDays
}

function ComputeDistComp(rental){
  return rental.distance * cars.find(x => x.id === rental.carId).pricePerKm;
}

function DeductibleReduction(rental) {
    if (rental.options.deductibleReduction == true) {
        return 4
    }
    else {
        return 0
    }
}

function ComputePrice(actors) {
    return (rentals.find(x => x.id == actors.rentalId).price);
}

function ComputeVirtuo(actors) {
    return (rentals.find(x => x.id == actors.rentalId).commission.virtuo);
}

function ComputeTreasury(actors) {
    return (rentals.find(x => x.id == actors.rentalId).commission.treasury);
}

function ComputeInsurance(actors) {
    return (rentals.find(x => x.id == actors.rentalId).commission.insurance);
}


rentals.forEach(function (part, index) {
    this[index].price = ComputeTimeComp(part) + ComputeDistComp(part) + DeductibleReduction(part) * ReturnDay(part);
    this[index].commission.insurance = (this[index].price -DeductibleReduction(part) * ReturnDay(part))*0.3*0.5;
    this[index].commission.treasury = ReturnDay(part);
    this[index].commission.virtuo = (this[index].price - DeductibleReduction(part) * ReturnDay(part)) * 0.3 * 0.5 - this[index].commission.treasury + DeductibleReduction(part) * ReturnDay(part);
},rentals);

actors.forEach(function (part, index) {
    this[index].payment[0].amount = ComputePrice(part);
    this[index].payment[2].amount = ComputeInsurance(part);
    this[index].payment[3].amount= ComputeTreasury(part);
    this[index].payment[4].amount = ComputeVirtuo(part);
    this[index].payment[1].amount = this[index].payment[0].amount - this[index].payment[2].amount - this[index].payment[3].amount - this[index].payment[4].amount;
}, actors);





console.log(cars);
console.log(rentals);
console.log(actors);