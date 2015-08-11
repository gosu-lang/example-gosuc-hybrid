package example

public class Foo implements Bar {

  override function doSomething(arg : String) : String {
    return "Hello, got the argument '${arg}'"
  }

}