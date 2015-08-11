package example

uses example.Foo
uses example.Bar
uses org.junit.Assert
uses org.junit.Test

class FooTest {

  @Test
  function makeAFoo() {
    print("newing Foo")
    var foo = new Foo()
    Assert.assertNotNull(foo)

    Assert.assertTrue(foo typeis Bar)

    print(foo.doSomething("eureka"))
    Assert.assertEquals(42, foo.MeaningOfLife)
  }

}