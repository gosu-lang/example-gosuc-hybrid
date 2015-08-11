# example-gosuc-hybrid
Example usage of the Gosu compiler component for Maven's compiler plugin

## Assumptions
This project assumes a hybrid Gosu project with a mixture of Java and Gosu classes and tests.

With regards to ordering:
* Java classes will be compiled prior to Gosu classes.
* Java tests will execute prior to Gosu tests.

## POM configuration
Having more than one source root in a module is considered somewhat unorthodox.  It's quite possible, however requires significantly more configuration when compared to example-gosuc-simple.

First off, we need to leverage Maven's `build-helper-maven-plugin`.
That's because the POM schema only allows us to set a single source or testSource directory in a project.
However, the underlying MavenProject object _can_ support multiple roots, accessible via `build-helper-maven-plugin`.
To accomplish this, attach an additional execution to the `add-source` and `add-test-source` goals, adding the relevant gosu roots.

Next, we need to tell the `maven-compiler-plugin` to do two passes: once for Java, then again for Gosu.
Configuration specific to the Gosu pass of the compiler must be confined within `<execution>` tags,
otherwise it would interfere with the default (Java-mode) configuration of the compiler plugin.

Finally, ensure that `maven-compiler-plugin` has a dependency on `plexus-compiler-gosu`.
Without this, the Gosu-specific executions would fail as they are unable to find the `gosuc` implementation.

## Usage/Outcome
Executing `$ mvn compile` should produce the following output:
```
[INFO] --- build-helper-maven-plugin:1.9.1:add-source (add-source) @ example-gosuc-hybrid ---
[INFO] Source directory: /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/src/main/gosu added.
...
[INFO] --- maven-compiler-plugin:3.3:compile (default-compile) @ example-gosuc-hybrid ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/target/classes
...
[INFO] --- maven-compiler-plugin:3.3:compile (Compile Gosu sources) @ example-gosuc-hybrid ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 3 source files to /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/target/classes
[INFO] Adding Gosu JARs to compiler classpath
```

Executing `$ mvn test` should produce the following additional output:
```
[INFO] --- build-helper-maven-plugin:1.9.1:add-test-source (add-test-source) @ example-gosuc-hybrid ---
[INFO] Test Source directory: /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/src/test/gosu added.
...
[INFO] --- maven-compiler-plugin:3.3:testCompile (default-testCompile) @ example-gosuc-hybrid ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/target/test-classes
...
[INFO] --- maven-compiler-plugin:3.3:testCompile (Compile Gosu test sources) @ example-gosuc-hybrid ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 2 source files to /home/kmoore/dev/gosu-lang/example-gosuc-hybrid/target/test-classes
[INFO] Adding Gosu JARs to compiler classpath
...
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running example.JavaTest
Running test method: public void example.JavaTest.noOpTest()
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.028 sec
Running example.FooTest
newing Foo
Hello, got the argument 'eureka'
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.652 sec

Results :

Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
```