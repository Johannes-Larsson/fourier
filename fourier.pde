float T = 200; // period
float A = 100; // amplitude
float speed = .3; // how much the graph moves each frame
float dt = .1; // delta time each frame
int fps = 60; // frames per second
int terms = 200; // how many fourier terms to use

Term term(int n) { // should return the nth term
  return new Term(n*2+1, A / (n*2+1)); // square wave
}


float t = 0;

ArrayList<Point> points;

Term first;

void setup() {
  size(800, 300);
  
  first = term(0);
  
  for (int i = 1; i < terms; i++) {
    Term next = term(i);
    
    Term last = first;
    while (last.next != null) last = last.next;
    last.next = next;
  }
  
  points = new ArrayList<Point>();
  
  frameRate(fps);
}


void draw() {
  background(30);
  stroke(255);
  
  PVector end = first.draw(t, height / 2, height / 2);
  t += dt;
  
  stroke(100);
  line(end.x, end.y, height, end.y);
  
  stroke(50);
  line(height, 0, height, height);
  
  points.add(new Point(height, end.y));
  
  stroke(255);
  for (int i = points.size() - 1; i >= 0; i--) {
    if (points.get(i).x > width) points.remove(i);
    else points.get(i).draw();
  }
  
}


class Term {
  float a;
  float b;
  int k;
  
  Term next;
  
  public Term(int k, float a) {
    this.k = k;
    this.a = a;
  }
  
  PVector draw(float t, float x, float y) {
    float xn = x + a * cos(t*TAU*k/T);
    float yn = y + a * sin(t*TAU*k/T);
    line(x, y, xn, yn);
    if (next != null) return next.draw(t, xn, yn);
    else return new PVector(xn, yn);
  }
}

class Point {
  float x, y;
  
  Point(float x, float y) {
    this.x = x;
    this.y = y;
  }
  
  void draw() {
    point(x,y);
    x += speed;
  }
}