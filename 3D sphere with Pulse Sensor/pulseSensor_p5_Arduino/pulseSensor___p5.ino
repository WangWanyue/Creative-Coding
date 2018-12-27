void setup() {
  // initialize the serial communication:
  Serial.begin(9600);
}

void loop() {
  // send the value of analog input 0:
  int pulse1 = analogRead(A0);
  int data1 = 10000 + pulse1;
  int pulse2 = analogRead(A1);
  int data2=20000+pulse2;
  Serial.println(data1);
  Serial.println(data2);
  //Serial.println(analogRead(A1));
  // wait a bit for the analog-to-digital converter to stabilize after the last
  // reading:
  delay(2);
}
