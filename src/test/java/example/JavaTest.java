package example;

import org.junit.Test;
import static org.junit.Assert.*;

public class JavaTest {

  @Test
  public void noOpTest() {
    System.out.println("Running test method: " + this.getClass().getMethods()[0]);
    assertTrue( 1 + 1 == 2);
  }

}
