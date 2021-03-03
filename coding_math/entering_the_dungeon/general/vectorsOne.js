var v1 = vector.create(12, 7);

console.log(v1.getX());
console.log(v1.getY());
console.log(v1.getLength());
console.log(v1.getAngle());

// set angle and set length
v1.setAngle(Math.PI / 6); // 30 degrees
v1.setLength(100);  // 100 is the length of the hypotenuse

console.log(v1.getX()); // adjacent side should be 0.86 the sixe of the hypotenuse in a 30, 60, 90 triangle
console.log(v1.getY()); // opposite site half the hypotenuse


// checking out the add and subtract methods
var v2 = vector.create(5, 10),
    v3 = vector.create(10, 20),
    v4 = v2.add(v3),
    v5 = v3.subtract(v2)
    v6 = v3.multiply(8),
    v7 = v3.divide(10)
    // log and check results
    console.log(v4.getX(), v4.getY());
    console.log(v5.getX(), v5.getY());
    console.log(v6.getX(), v6.getY());
    console.log(v7.getX(), v7.getY());
    // addTo method check
    v2.addTo(v3);
    console.log(v2.getX(), v2.getY());
