package c

uses b.Grandchild

class DoesNotWork {

  var _gc : Grandchild

  construct() {
    _gc.doSomething()
  }
  
}