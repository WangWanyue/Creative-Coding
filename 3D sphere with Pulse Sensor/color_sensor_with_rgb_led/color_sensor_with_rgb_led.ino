/***************************************************************************
  This is a library for the APDS9960 digital proximity, ambient light, RGB, and gesture sensor

  This sketch puts the sensor in color mode and reads the RGB and clear values.

  Designed specifically to work with the Adafruit APDS9960 breakout
  ----> http://www.adafruit.com/products/3595

  These sensors use I2C to communicate. The device's I2C address is 0x39

  Adafruit invests time and resources providing this open source code,
  please support Adafruit andopen-source hardware by purchasing products
  from Adafruit!

  Written by Dean Miller for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ***************************************************************************/

#include "Adafruit_APDS9960.h"
Adafruit_APDS9960 apds;

int redPin = 11;
int greenPin = 10;
int bluePin = 9;
int r=-255;
int g =255;
int b=-255;
void setup() {
  Serial.begin(9600);

  if(!apds.begin()){
    Serial.println("failed to initialize device! Please check your wiring.");
  }
  else Serial.println("Device initialized!");

  //enable color sensign mode
  apds.enableColor(true);

  pinMode(redPin, OUTPUT);
pinMode(greenPin, OUTPUT);
pinMode(bluePin, OUTPUT);


}

void loop() {
  //create some variables to store the color data in
  uint16_t r, g, b, c;
  
  //wait for color data to be ready
  while(!apds.colorDataReady()){
    delay(5);
  }

  //get the data and print the different channels
  apds.getColorData(&r, &g, &b, &c);
  Serial.print("red: ");
   Serial.print(r);
  Serial.print("red: ");
 
  r=map(r, 1, 40, 255,0);
   Serial.print(r);

  Serial.print(" green: ");
    Serial.print(g);
  Serial.print(" green: ");
  g=map(g, 2, 30, 255,0);
  Serial.print(g);

  Serial.print(" blue: ");
  Serial.print(b);
  b=map(b, 3,100, 255,0);
   Serial.print(" blue: ");
  Serial.print(b);

  Serial.print(" clear: ");
  Serial.println(c);
  Serial.println();

 // setColor(r,g,b);
analogWrite(redPin, 255);
analogWrite(greenPin, 255);
analogWrite(bluePin, 0);


  delay(1000);
}

void setColor(int red, int green, int blue)
{
#ifdef COMMON_ANODE
red = 255-red;
green = 255 - green;
blue = 255 - blue;

#endif
analogWrite(redPin, red);
analogWrite(greenPin, green);
analogWrite(bluePin, blue);
}
