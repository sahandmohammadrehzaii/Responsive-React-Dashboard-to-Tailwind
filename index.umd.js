(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.ReactSpring = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, reactDom) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  var regenerator = runtime_1;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose$1 = _inheritsLoose$1;

  var getPrototypeOf = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;
  });

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  var isNativeReflectConstruct = _isNativeReflectConstruct;

  var construct = createCommonjsModule(function (module) {
    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        module.exports = _construct = Reflect.construct;
      } else {
        module.exports = _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return construct(Class, arguments, getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return setPrototypeOf(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    module.exports = _wrapNativeSuper;
  });

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  var useLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? React.useLayoutEffect : React.useEffect;

  var requestAnimationFrame = function requestAnimationFrame(fn) {
    return (0, requestAnimationFrame$1)(fn);
  };
  /**
   * FrameLoop executes its animations in order of lowest priority first.
   * Animations are retained until idle.
   */


  var FrameLoop =
  /** @class */
  function () {
    function FrameLoop(raf) {
      if (raf === void 0) {
        raf = requestAnimationFrame;
      }

      var idle = true;
      var writing = false; // The most recent framestamp

      var lastTime = 0; // The active animations for the current frame, sorted by lowest priority first

      var animations = []; // The priority of the currently advancing animation.
      // To protect against a race condition whenever a frame is being processed,
      // where the filtering of `animations` is corrupted with a shifting index,
      // causing animations to potentially advance 2x faster than intended.

      var priority = 0; // Animations starting on the next frame

      var startQueue = new Set(); // Flushed after all animations are updated.
      // Used to dispatch events to an "onFrame" prop, for example.

      var frameQueue = new Set(); // Flushed at the very end of each frame.
      // Used to avoid layout thrashing in @react-spring/web, for example.

      var writeQueue = new Set(); // Add an animation to the frameloop

      var start = function start(animation) {
        var index = animations.indexOf(animation);

        if (index < 0) {
          index = animations.findIndex(function (other) {
            return other.priority > animation.priority;
          });
          animations.splice(~index ? index : animations.length, 0, animation);
        }
      };

      var loop = function loop() {
        if (idle) return;

        try {
          advance();
          raf(loop);
        } catch (e) {
          console.error(e);
        }
      }; // Start the frameloop


      var kickoff = function kickoff() {
        if (idle) {
          idle = false; // To minimize frame skips, the frameloop never stops.

          if (lastTime == 0) {
            lastTime = now();
            raf(loop);
          }
        }
      };

      var timeoutQueue = [];

      this.setTimeout = function (handler, ms) {
        var time = now() + ms;

        var cancel = function cancel() {
          var index = timeoutQueue.findIndex(function (t) {
            return t.cancel == cancel;
          });

          if (index >= 0) {
            timeoutQueue.splice(index, 1);
          }
        };

        var index = findIndex(timeoutQueue, function (t) {
          return t.time > time;
        });
        var timeout = {
          time: time,
          handler: handler,
          cancel: cancel
        };
        timeoutQueue.splice(index, 0, timeout);
        kickoff();
        return timeout;
      }; // Process the current frame.


      var advance = this.advance = function () {
        var time = now(); // Start animations that were added during last frame.

        if (startQueue.size) {
          startQueue.forEach(start);
          startQueue.clear();
        } // Flush the timeout queue.


        if (timeoutQueue.length) {
          batchedUpdates(function () {
            var count = findIndex(timeoutQueue, function (t) {
              return t.time > time;
            });
            timeoutQueue.splice(0, count).forEach(function (t) {
              return t.handler();
            });
          });
        }

        if (time > lastTime) {
          // http://gafferongames.com/game-physics/fix-your-timestep/
          var dt_1 = Math.min(64, time - lastTime);
          lastTime = time;
          batchedUpdates(function () {
            // Animations can be added while the frameloop is updating,
            // but they need a higher priority to be started on this frame.
            if (animations.length) {
              willAdvance(animations);
              animations = animations.filter(function (animation) {
                priority = animation.priority; // Animations may go idle before the next frame.

                if (!animation.idle) {
                  animation.advance(dt_1);
                } // Remove idle animations.


                return !animation.idle;
              });
              priority = 0;
            }

            if (frameQueue.size) {
              frameQueue.forEach(function (onFrame) {
                return onFrame(time);
              });
              frameQueue.clear();
            }

            if (writeQueue.size) {
              writing = true;
              writeQueue.forEach(function (write) {
                return write(time);
              });
              writeQueue.clear();
              writing = false;
            }
          });
        }
      };

      this.start = function (animation) {
        if (priority > animation.priority) {
          startQueue.add(animation);
        } else {
          start(animation);
          kickoff();
        }
      };

      this.onFrame = function (cb) {
        frameQueue.add(cb);
        kickoff();
      };

      this.onWrite = function (cb) {
        if (writing) cb(lastTime);else writeQueue.add(cb);
      }; // Expose internals for testing.


      if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
        var dispose_1 = function dispose_1() {
          idle = true;
          startQueue.clear();
          timeoutQueue.length = 0;
        };

        Object.defineProperties(this, {
          _animations: {
            get: function get() {
              return animations;
            }
          },
          _dispose: {
            get: function get() {
              return dispose_1;
            }
          }
        });
      }
    }

    return FrameLoop;
  }();
  /** Like `Array.prototype.findIndex` but returns `arr.length` instead of `-1` */

  function findIndex(arr, test) {
    var index = arr.findIndex(test);
    return index < 0 ? arr.length : index;
  }

  var noop = function noop() {};
  var defineHidden = function defineHidden(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      writable: true,
      configurable: true
    });
  };
  var is = {
    arr: Array.isArray,
    obj: function obj(a) {
      return !!a && a.constructor.name === 'Object';
    },
    fun: function fun(a) {
      return typeof a === 'function';
    },
    str: function str(a) {
      return typeof a === 'string';
    },
    num: function num(a) {
      return typeof a === 'number';
    },
    und: function und(a) {
      return a === undefined;
    }
  };
  /** Compare animatable values */

  function isEqual(a, b) {
    if (is.arr(a)) {
      if (!is.arr(b) || a.length !== b.length) return false;

      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    return a === b;
  } // Not all strings can be animated (eg: {display: "none"})

  var isAnimatedString = function isAnimatedString(value) {
    return is.str(value) && (value[0] == '#' || /\d/.test(value) || !!(colorNames && colorNames[value]));
  };
  /** An unsafe object/array/set iterator that allows for better minification */

  var each = function each(obj, cb, ctx) {
    if (is.fun(obj.forEach)) {
      obj.forEach(cb, ctx);
    } else {
      Object.keys(obj).forEach(function (key) {
        return cb.call(ctx, obj[key], key);
      });
    }
  };
  var toArray = function toArray(a) {
    return is.und(a) ? [] : is.arr(a) ? a : [a];
  };
  function flush(queue, iterator) {
    if (queue.size) {
      var items = Array.from(queue);
      queue.clear();
      each(items, iterator);
    }
  }

  // Required
  //

  var createStringInterpolator;
  var frameLoop = new FrameLoop(); //
  // Optional
  //

  var to;
  var now = function now() {
    return performance.now();
  };
  var colorNames = null;
  var skipAnimation = false;
  var requestAnimationFrame$1 = typeof window !== 'undefined' ? window.requestAnimationFrame : function () {
    return -1;
  };
  var batchedUpdates = function batchedUpdates(callback) {
    return callback();
  };
  var willAdvance = noop;
  var assign = function assign(globals) {
    var _a;

    return _a = Object.assign({
      to: to,
      now: now,
      frameLoop: frameLoop,
      colorNames: colorNames,
      skipAnimation: skipAnimation,
      createStringInterpolator: createStringInterpolator,
      requestAnimationFrame: requestAnimationFrame$1,
      batchedUpdates: batchedUpdates,
      willAdvance: willAdvance
    }, pluckDefined(globals)), to = _a.to, now = _a.now, frameLoop = _a.frameLoop, colorNames = _a.colorNames, skipAnimation = _a.skipAnimation, createStringInterpolator = _a.createStringInterpolator, requestAnimationFrame$1 = _a.requestAnimationFrame, batchedUpdates = _a.batchedUpdates, willAdvance = _a.willAdvance, _a;
  }; // Ignore undefined values

  function pluckDefined(globals) {
    var defined = {};

    for (var key in globals) {
      if (globals[key] !== undefined) defined[key] = globals[key];
    }

    return defined;
  }

  var globals = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get createStringInterpolator () { return createStringInterpolator; },
    get frameLoop () { return frameLoop; },
    get to () { return to; },
    get now () { return now; },
    get colorNames () { return colorNames; },
    get skipAnimation () { return skipAnimation; },
    get requestAnimationFrame () { return requestAnimationFrame$1; },
    get batchedUpdates () { return batchedUpdates; },
    get willAdvance () { return willAdvance; },
    assign: assign
  });

  var useOnce = function useOnce(effect) {
    return React.useEffect(effect, []);
  };
  /** Return a function that re-renders this component, if still mounted */

  var useForceUpdate = function useForceUpdate() {
    var update = React.useState(0)[1];
    var unmounted = React.useRef(false);
    useOnce(function () {
      return function () {
        unmounted.current = true;
      };
    });
    return function () {
      if (!unmounted.current) {
        update({});
      }
    };
  };
  /** Use a value from the previous render */

  function usePrev(value) {
    var prevRef = React.useRef(undefined);
    React.useEffect(function () {
      prevRef.current = value;
    });
    return prevRef.current;
  }

  var createInterpolator = function createInterpolator(range, output, extrapolate) {
    if (is.fun(range)) {
      return range;
    }

    if (is.arr(range)) {
      return createInterpolator({
        range: range,
        output: output,
        extrapolate: extrapolate
      });
    }

    if (is.str(range.output[0])) {
      return createStringInterpolator(range);
    }

    var config = range;
    var outputRange = config.output;
    var inputRange = config.range || [0, 1];
    var extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
    var extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';

    var easing = config.easing || function (t) {
      return t;
    };

    return function (input) {
      var range = findRange(input, inputRange);
      return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
    };
  };

  function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    var result = map ? map(input) : input; // Extrapolate

    if (result < inputMin) {
      if (extrapolateLeft === 'identity') return result;else if (extrapolateLeft === 'clamp') result = inputMin;
    }

    if (result > inputMax) {
      if (extrapolateRight === 'identity') return result;else if (extrapolateRight === 'clamp') result = inputMax;
    }

    if (outputMin === outputMax) return outputMin;
    if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax; // Input Range

    if (inputMin === -Infinity) result = -result;else if (inputMax === Infinity) result = result - inputMin;else result = (result - inputMin) / (inputMax - inputMin); // Easing

    result = easing(result); // Output Range

    if (outputMin === -Infinity) result = -result;else if (outputMax === Infinity) result = result + outputMin;else result = result * (outputMax - outputMin) + outputMin;
    return result;
  }

  function findRange(input, inputRange) {
    for (var i = 1; i < inputRange.length - 1; ++i) {
      if (inputRange[i] >= input) break;
    }

    return i - 1;
  }

  var $config = Symbol["for"]('FluidValue:config');

  function getFluidValue(arg) {
    var config = getFluidConfig(arg);
    return config ? config.get() : arg;
  }

  function getFluidConfig(arg) {
    if (arg) return arg[$config];
  }
  /** Set the methods for observing the given object. */


  function setFluidConfig(target, config) {
    Object.defineProperty(target, $config, {
      value: config,
      configurable: true
    });
  }
  /**
   * This class stores a single dynamic value, which can be observed by multiple `FluidObserver` objects.
   *
   * In order to support non-writable streams, this class doesn't expect a `set` method to exist.
   *
   * It can send *any* event to observers, not only change events.
   */


  var FluidValue =
  /** @class */
  function () {
    function FluidValue() {
      setFluidConfig(this, this);
    }

    return FluidValue;
  }();

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized$1 = _assertThisInitialized$1;

  function _inheritsLoose$2(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose$2 = _inheritsLoose$2;

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$1.apply(this, arguments);
  }

  var useLayoutEffect$1 = typeof window !== 'undefined' && window.document && window.document.createElement ? React.useLayoutEffect : React.useEffect;

  var $node = Symbol["for"]('Animated:node');

  var isAnimated = function isAnimated(value) {
    return !!value && value[$node] === value;
  };
  /** Get the owner's `Animated` node. */


  var getAnimated = function getAnimated(owner) {
    return owner && owner[$node];
  };
  /** Set the owner's `Animated` node. */


  var setAnimated = function setAnimated(owner, node) {
    return defineHidden(owner, $node, node);
  };
  /** Get every `AnimatedValue` in the owner's `Animated` node. */


  var getPayload = function getPayload(owner) {
    return owner && owner[$node] && owner[$node].getPayload();
  };

  var Animated = /*#__PURE__*/function () {
    /** The cache of animated values */
    function Animated() {
      this.payload = void 0; // This makes "isAnimated" return true.

      setAnimated(this, this);
    }
    /** Get the current value. Pass `true` for only animated values. */

    /** Get every `AnimatedValue` used by this node. */


    var _proto = Animated.prototype;

    _proto.getPayload = function getPayload() {
      return this.payload || [];
    };

    return Animated;
  }();
  /** An animated number or a native attribute value */


  var AnimatedValue = /*#__PURE__*/function (_Animated) {
    inheritsLoose$2(AnimatedValue, _Animated);

    function AnimatedValue(_value) {
      var _this;

      _this = _Animated.call(this) || this;
      _this._value = _value;
      _this.done = true;
      _this.elapsedTime = void 0;
      _this.lastPosition = void 0;
      _this.lastVelocity = void 0;
      _this.v0 = void 0;

      if (is.num(_this._value)) {
        _this.lastPosition = _this._value;
      }

      return _this;
    }

    AnimatedValue.create = function create(from, _to) {
      return new AnimatedValue(from);
    };

    var _proto2 = AnimatedValue.prototype;

    _proto2.getPayload = function getPayload() {
      return [this];
    };

    _proto2.getValue = function getValue() {
      return this._value;
    }
    /**
     * Set the current value and optionally round it.
     *
     * The `step` argument does nothing whenever it equals `undefined` or `0`.
     * It works with fractions and whole numbers. The best use case is (probably)
     * rounding to the pixel grid with a step of:
     *
     *      1 / window.devicePixelRatio
     */
    ;

    _proto2.setValue = function setValue(value, step) {
      if (is.num(value)) {
        this.lastPosition = value;

        if (step) {
          value = Math.round(value / step) * step;

          if (this.done) {
            this.lastPosition = value;
          }
        }
      }

      if (this._value === value) {
        return false;
      }

      this._value = value;
      return true;
    };

    _proto2.reset = function reset() {
      var done = this.done;
      this.done = false;

      if (is.num(this._value)) {
        this.elapsedTime = 0;
        this.lastPosition = this._value;
        if (done) this.lastVelocity = null;
        this.v0 = null;
      }
    };

    return AnimatedValue;
  }(Animated);

  var AnimatedString = /*#__PURE__*/function (_AnimatedValue) {
    inheritsLoose$2(AnimatedString, _AnimatedValue);

    function AnimatedString(from, to) {
      var _this2;

      _this2 = _AnimatedValue.call(this, 0) || this;
      _this2._value = void 0;
      _this2._string = null;
      _this2._toString = void 0;
      _this2._toString = createInterpolator({
        output: [from, to]
      });
      return _this2;
    }

    AnimatedString.create = function create(from, to) {
      if (to === void 0) {
        to = from;
      }

      if (is.str(from) && is.str(to)) {
        return new AnimatedString(from, to);
      }

      throw TypeError('Expected "from" and "to" to be strings');
    };

    var _proto3 = AnimatedString.prototype;

    _proto3.getValue = function getValue() {
      var value = this._string;
      return value == null ? this._string = this._toString(this._value) : value;
    };

    _proto3.setValue = function setValue(value) {
      if (!is.num(value)) {
        this._string = value;
        this._value = 1;
      } else if (_AnimatedValue.prototype.setValue.call(this, value)) {
        this._string = null;
      } else {
        return false;
      }

      return true;
    };

    _proto3.reset = function reset(goal) {
      if (goal) {
        this._toString = createInterpolator({
          output: [this.getValue(), goal]
        });
      }

      this._value = 0;

      _AnimatedValue.prototype.reset.call(this);
    };

    return AnimatedString;
  }(AnimatedValue);

  var TreeContext = {
    current: null
  };
  /** An object containing `Animated` nodes */

  var AnimatedObject = /*#__PURE__*/function (_Animated2) {
    inheritsLoose$2(AnimatedObject, _Animated2);

    function AnimatedObject(source) {
      var _this3;

      if (source === void 0) {
        source = null;
      }

      _this3 = _Animated2.call(this) || this;
      _this3.source = void 0;

      _this3.setValue(source);

      return _this3;
    }

    var _proto4 = AnimatedObject.prototype;

    _proto4.getValue = function getValue(animated) {
      if (!this.source) return null;
      var values = {};
      each(this.source, function (source, key) {
        if (isAnimated(source)) {
          values[key] = source.getValue(animated);
        } else {
          var config = getFluidConfig(source);

          if (config) {
            values[key] = config.get();
          } else if (!animated) {
            values[key] = source;
          }
        }
      });
      return values;
    }
    /** Replace the raw object data */
    ;

    _proto4.setValue = function setValue(source) {
      this.source = source;
      this.payload = this._makePayload(source);
    };

    _proto4.reset = function reset() {
      if (this.payload) {
        each(this.payload, function (node) {
          return node.reset();
        });
      }
    }
    /** Create a payload set. */
    ;

    _proto4._makePayload = function _makePayload(source) {
      if (source) {
        var payload = new Set();
        each(source, this._addToPayload, payload);
        return Array.from(payload);
      }
    }
    /** Add to a payload set. */
    ;

    _proto4._addToPayload = function _addToPayload(source) {
      var _this4 = this;

      var config = getFluidConfig(source);

      if (config && TreeContext.current) {
        TreeContext.current.dependencies.add(source);
      }

      var payload = getPayload(source);

      if (payload) {
        each(payload, function (node) {
          return _this4.add(node);
        });
      }
    };

    return AnimatedObject;
  }(Animated);
  /** An array of animated nodes */


  var AnimatedArray = /*#__PURE__*/function (_AnimatedObject) {
    inheritsLoose$2(AnimatedArray, _AnimatedObject);

    function AnimatedArray(from, to) {
      var _this5;

      _this5 = _AnimatedObject.call(this, null) || this;
      _this5.source = void 0;

      _AnimatedObject.prototype.setValue.call(assertThisInitialized$1(_this5), _this5._makeAnimated(from, to));

      return _this5;
    }

    AnimatedArray.create = function create(from, to) {
      return new AnimatedArray(from, to);
    };

    var _proto5 = AnimatedArray.prototype;

    _proto5.getValue = function getValue() {
      return this.source.map(function (node) {
        return node.getValue();
      });
    };

    _proto5.setValue = function setValue(newValue) {
      var payload = this.getPayload(); // Reuse the payload when lengths are equal.

      if (newValue && newValue.length == payload.length) {
        each(payload, function (node, i) {
          return node.setValue(newValue[i]);
        });
      } else {
        // Remake the payload when length changes.
        this.source = this._makeAnimated(newValue);
        this.payload = this._makePayload(this.source);
      }
    }
    /** Convert the `from` and `to` values to an array of `Animated` nodes */
    ;

    _proto5._makeAnimated = function _makeAnimated(from, to) {
      if (to === void 0) {
        to = from;
      }

      return from ? from.map(function (from, i) {
        return (isAnimatedString(from) ? AnimatedString : AnimatedValue).create(from, to[i]);
      }) : [];
    };

    return AnimatedArray;
  }(AnimatedObject);

  var AnimatedProps = /*#__PURE__*/function (_AnimatedObject2) {
    inheritsLoose$2(AnimatedProps, _AnimatedObject2);

    /** Equals true when an update is scheduled for "end of frame" */
    function AnimatedProps(update) {
      var _this6;

      _this6 = _AnimatedObject2.call(this, null) || this;
      _this6.update = update;
      _this6.dirty = false;
      return _this6;
    }

    var _proto6 = AnimatedProps.prototype;

    _proto6.setValue = function setValue(props, context) {
      if (!props) return; // The constructor passes null.

      if (context) {
        TreeContext.current = context;

        if (props.style) {
          var createAnimatedStyle = context.host.createAnimatedStyle;
          props = _extends$1(_extends$1({}, props), {}, {
            style: createAnimatedStyle(props.style)
          });
        }
      }

      _AnimatedObject2.prototype.setValue.call(this, props);

      TreeContext.current = null;
    }
    /** @internal */
    ;

    _proto6.onParentChange = function onParentChange(_ref) {
      var _this7 = this;

      var type = _ref.type;

      if (!this.dirty && type === 'change') {
        this.dirty = true;
        frameLoop.onFrame(function () {
          _this7.dirty = false;

          _this7.update();
        });
      }
    };

    return AnimatedProps;
  }(AnimatedObject);

  var withAnimated = function withAnimated(Component, host) {
    return React.forwardRef(function (rawProps, ref) {
      var instanceRef = React.useRef(null);
      var hasInstance = // Function components must use "forwardRef" to avoid being
      // re-rendered on every animation frame.
      !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
      var forceUpdate = useForceUpdate();
      var props = new AnimatedProps(function () {
        var instance = instanceRef.current;

        if (hasInstance && !instance) {
          return; // The wrapped component forgot to forward its ref.
        }

        var didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false; // Re-render the component when native updates fail.

        if (didUpdate === false) {
          forceUpdate();
        }
      });
      var dependencies = new Set();
      props.setValue(rawProps, {
        dependencies: dependencies,
        host: host
      });
      useLayoutEffect$1(function () {
        each(dependencies, function (dep) {
          return dep.addChild(props);
        });
        return function () {
          return each(dependencies, function (dep) {
            return dep.removeChild(props);
          });
        };
      });
      return /*#__PURE__*/React.createElement(Component, _extends$1({}, host.getComponentProps(props.getValue()), {
        ref: hasInstance && function (value) {
          instanceRef.current = updateRef(ref, value);
        }
      }));
    });
  };

  function updateRef(ref, value) {
    if (ref) {
      if (is.fun(ref)) ref(value);else ref.current = value;
    }

    return value;
  } // For storing the animated version on the original component


  var cacheKey = Symbol["for"]('AnimatedComponent');

  var createHost = function createHost(components, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$applyAnimatedVa = _ref2.applyAnimatedValues,
        applyAnimatedValues = _ref2$applyAnimatedVa === void 0 ? function () {
      return false;
    } : _ref2$applyAnimatedVa,
        _ref2$createAnimatedS = _ref2.createAnimatedStyle,
        createAnimatedStyle = _ref2$createAnimatedS === void 0 ? function (style) {
      return new AnimatedObject(style);
    } : _ref2$createAnimatedS,
        _ref2$getComponentPro = _ref2.getComponentProps,
        getComponentProps = _ref2$getComponentPro === void 0 ? function (props) {
      return props;
    } : _ref2$getComponentPro;

    var hostConfig = {
      applyAnimatedValues: applyAnimatedValues,
      createAnimatedStyle: createAnimatedStyle,
      getComponentProps: getComponentProps
    };

    var animated = function animated(Component) {
      var displayName = getDisplayName(Component) || 'Anonymous';

      if (is.str(Component)) {
        Component = withAnimated(Component, hostConfig);
      } else {
        Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
      }

      Component.displayName = "Animated(" + displayName + ")";
      return Component;
    };

    each(components, function (Component, key) {
      if (!is.str(key)) {
        key = getDisplayName(Component);
      }

      animated[key] = animated(Component);
    });
    return {
      animated: animated
    };
  };

  var getDisplayName = function getDisplayName(arg) {
    return is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;
  };

  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }

    for (var i = 0; i < newInputs.length; i++) {
      if (newInputs[i] !== lastInputs[i]) {
        return false;
      }
    }

    return true;
  }

  function useMemoOne(getResult, inputs) {
    var initial = React.useState(function () {
      return {
        inputs: inputs,
        result: getResult()
      };
    })[0];
    var committed = React.useRef(initial);
    var isInputMatch = Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
    var cache = isInputMatch ? committed.current : {
      inputs: inputs,
      result: getResult()
    };
    React.useEffect(function () {
      committed.current = cache;
    }, [cache]);
    return cache.result;
  }

  function useCallbackOne(callback, inputs) {
    return useMemoOne(function () {
      return callback;
    }, inputs);
  }

  var prefix = 'react-spring: ';
  var flagInterpolate = false;
  function deprecateInterpolate() {
    if (!flagInterpolate) {
      flagInterpolate = true;
      console.warn(prefix + 'The "interpolate" function is deprecated in v10 (use "to" instead)');
    }
  }

  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return _assign.apply(this, arguments);
  };

  // const INTEGER = '[-+]?\\d+';
  var NUMBER = '[-+]?\\d*\\.?\\d+';
  var PERCENTAGE = NUMBER + '%';

  function call() {
    var parts = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      parts[_i] = arguments[_i];
    }

    return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
  }

  var rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
  var rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
  var hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
  var hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
  var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  var hex6 = /^#([0-9a-fA-F]{6})$/;
  var hex8 = /^#([0-9a-fA-F]{8})$/;

  /*
  https://github.com/react-community/normalize-css-color

  BSD 3-Clause License

  Copyright (c) 2016, React Community
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  function normalizeColor(color) {
    var match;

    if (typeof color === 'number') {
      return color >>> 0 === color && color >= 0 && color <= 0xffffffff ? color : null;
    } // Ordered based on occurrences on Facebook codebase


    if (match = hex6.exec(color)) return parseInt(match[1] + 'ff', 16) >>> 0;

    if (colorNames && colorNames[color] !== undefined) {
      return colorNames[color];
    }

    if (match = rgb.exec(color)) {
      return (parse255(match[1]) << 24 | // r
      parse255(match[2]) << 16 | // g
      parse255(match[3]) << 8 | // b
      0x000000ff) >>> // a
      0;
    }

    if (match = rgba.exec(color)) {
      return (parse255(match[1]) << 24 | // r
      parse255(match[2]) << 16 | // g
      parse255(match[3]) << 8 | // b
      parse1(match[4])) >>> // a
      0;
    }

    if (match = hex3.exec(color)) {
      return parseInt(match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      'ff', // a
      16) >>> 0;
    } // https://drafts.csswg.org/css-color-4/#hex-notation


    if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

    if (match = hex4.exec(color)) {
      return parseInt(match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      match[4] + match[4], // a
      16) >>> 0;
    }

    if (match = hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), // h
      parsePercentage(match[2]), // s
      parsePercentage(match[3]) // l
      ) | 0x000000ff) >>> // a
      0;
    }

    if (match = hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), // h
      parsePercentage(match[2]), // s
      parsePercentage(match[3]) // l
      ) | parse1(match[4])) >>> // a
      0;
    }

    return null;
  }

  function hue2rgb(h, c, x) {
    if (h < 60) return [c, x, 0];
    if (h < 120) return [x, c, 0];
    if (h < 180) return [0, c, x];
    if (h < 240) return [0, x, c];
    if (h < 300) return [x, 0, c];
    return [c, 0, x];
  }

  function hslToRgb(h, s, l) {
    var C = (1 - Math.abs(2 * l - 1)) * s;
    var X = C * (1 - Math.abs(h / 60 % 2 - 1));
    var M = l - C / 2;

    var _a = hue2rgb(h, C, X),
        R1 = _a[0],
        G1 = _a[1],
        B1 = _a[2];

    return Math.round((R1 + M) * 255) << 24 | Math.round((G1 + M) * 255) << 16 | Math.round((B1 + M) * 255) << 8;
  }

  function parse255(str) {
    var _int = parseInt(str, 10);

    if (_int < 0) return 0;
    if (_int > 255) return 255;
    return _int;
  }

  function parse360(str) {
    var _int2 = parseFloat(str);

    return (_int2 % 360 + 360) % 360 / 360;
  }

  function parse1(str) {
    var num = parseFloat(str);
    if (num < 0) return 0;
    if (num > 1) return 255;
    return Math.round(num * 255);
  }

  function parsePercentage(str) {
    // parseFloat conveniently ignores the final %
    var _int3 = parseFloat(str);

    if (_int3 < 0) return 0;
    if (_int3 > 100) return 1;
    return _int3 / 100;
  }

  function colorToRgba(input) {
    var int32Color = normalizeColor(input);
    if (int32Color === null) return input;
    int32Color = int32Color || 0;
    var r = (int32Color & 0xff000000) >>> 24;
    var g = (int32Color & 0x00ff0000) >>> 16;
    var b = (int32Color & 0x0000ff00) >>> 8;
    var a = (int32Color & 0x000000ff) / 255;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  // Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662

  var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; // Covers rgb, rgba, hsl, hsla
  // Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e

  var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi; // Covers color names (transparent, blue, etc.)

  var colorNamesRegex; // rgba requires that the r,g,b are integers.... so we want to round them,
  // but we *dont* want to round the opacity (4th column).

  var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;

  var rgbaRound = function rgbaRound(_, p1, p2, p3, p4) {
    return "rgba(" + Math.round(p1) + ", " + Math.round(p2) + ", " + Math.round(p3) + ", " + p4 + ")";
  };
  /**
   * Supports string shapes by extracting numbers so new values can be computed,
   * and recombines those values into new strings of the same shape.  Supports
   * things like:
   *
   *     "rgba(123, 42, 99, 0.36)"           // colors
   *     "-45deg"                            // values with units
   *     "0 2px 2px 0px rgba(0, 0, 0, 0.12)" // CSS box-shadows
   *     "rotate(0deg) translate(2px, 3px)"  // CSS transforms
   */


  var createStringInterpolator$1 = function createStringInterpolator(config) {
    if (!colorNamesRegex) colorNamesRegex = colorNames ? new RegExp("(" + Object.keys(colorNames).join('|') + ")", 'g') : /^\b$/; // never match
    // Convert colors to rgba(...)

    var output = config.output.map(function (value) {
      return getFluidValue(value).replace(colorRegex, colorToRgba).replace(colorNamesRegex, colorToRgba);
    }); // Convert ["1px 2px", "0px 0px"] into [[1, 2], [0, 0]]

    var keyframes = output.map(function (value) {
      return value.match(numberRegex).map(Number);
    }); // Convert ["1px 2px", "0px 0px"] into [[1, 0], [2, 0]]

    var outputRanges = keyframes[0].map(function (_, i) {
      return keyframes.map(function (values) {
        if (!(i in values)) {
          throw Error('The arity of each "output" value must be equal');
        }

        return values[i];
      });
    }); // Create an interpolator for each animated number

    var interpolators = outputRanges.map(function (output) {
      return createInterpolator(_assign(_assign({}, config), {
        output: output
      }));
    }); // Use the first `output` as a template for each call

    return function (input) {
      var i = 0;
      return output[0].replace(numberRegex, function () {
        return String(interpolators[i++](input));
      }).replace(rgbaRegex, rgbaRound);
    };
  };

  function _createForOfIteratorHelperLoose(o) { var i = 0; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } i = o[Symbol.iterator](); return i.next.bind(i); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /** API
   *  useChain(references, timeSteps, timeFrame)
   */

  function useChain(refs, timeSteps, timeFrame) {
    if (timeFrame === void 0) {
      timeFrame = 1000;
    }

    useLayoutEffect(function () {
      if (timeSteps) {
        var prevDelay = 0;

        each(refs, function (ref, i) {
          if (!ref.current) return;
          var controllers = ref.current.controllers;

          if (controllers.length) {
            var delay = timeFrame * timeSteps[i]; // Use the previous delay if none exists.

            if (isNaN(delay)) delay = prevDelay;else prevDelay = delay;

            each(controllers, function (ctrl) {
              each(ctrl.queue, function (props) {
                props.delay = delay + (props.delay || 0);
              });

              ctrl.start();
            });
          }
        });
      } else {
        var p = Promise.resolve();

        each(refs, function (ref) {
          var _ref2 = ref.current || {},
              controllers = _ref2.controllers,
              start = _ref2.start;

          if (controllers && controllers.length) {
            // Take the queue of each controller
            var updates = controllers.map(function (ctrl) {
              var q = ctrl.queue;
              ctrl.queue = [];
              return q;
            }); // Apply the queue when the previous ref stops animating

            p = p.then(function () {
              each(controllers, function (ctrl, i) {
                var _ctrl$queue;

                return (_ctrl$queue = ctrl.queue).push.apply(_ctrl$queue, updates[i]);
              });

              return start();
            });
          }
        });
      }
    });
  } // The `mass` prop defaults to 1


  var config = {
    "default": {
      tension: 170,
      friction: 26
    },
    gentle: {
      tension: 120,
      friction: 14
    },
    wobbly: {
      tension: 180,
      friction: 12
    },
    stiff: {
      tension: 210,
      friction: 20
    },
    slow: {
      tension: 280,
      friction: 60
    },
    molasses: {
      tension: 280,
      friction: 120
    }
  };

  var linear = function linear(t) {
    return t;
  };

  var defaults = _extends(_extends({}, config["default"]), {}, {
    mass: 1,
    damping: 1,
    easing: linear,
    clamp: false
  });

  var AnimationConfig =
  /**
   * With higher tension, the spring will resist bouncing and try harder to stop at its end value.
   *
   * When tension is zero, no animation occurs.
   */

  /**
   * The damping ratio coefficient, or just the damping ratio when `speed` is defined.
   *
   * When `speed` is defined, this value should be between 0 and 1.
   *
   * Higher friction means the spring will slow down faster.
   */

  /**
   * The natural frequency (in seconds), which dictates the number of bounces
   * per second when no damping exists.
   *
   * When defined, `tension` is derived from this, and `friction` is derived
   * from `tension` and `damping`.
   */

  /**
   * The damping ratio, which dictates how the spring slows down.
   *
   * Set to `0` to never slow down. Set to `1` to slow down without bouncing.
   * Between `0` and `1` is for you to explore.
   *
   * Only works when `frequency` is defined.
   *
   * Defaults to 1
   */

  /**
   * Higher mass means more friction is required to slow down.
   *
   * Defaults to 1, which works fine most of the time.
   */

  /**
   * The initial velocity of one or more values.
   */

  /**
   * The smallest velocity before the animation is considered "not moving".
   *
   * When undefined, `precision` is used instead.
   */

  /**
   * The smallest distance from a value before that distance is essentially zero.
   *
   * This helps in deciding when a spring is "at rest". The spring must be within
   * this distance from its final value, and its velocity must be lower than this
   * value too (unless `restVelocity` is defined).
   */

  /**
   * For `duration` animations only. Note: The `duration` is not affected
   * by this property.
   *
   * Defaults to `0`, which means "start from the beginning".
   *
   * Setting to `1+` makes an immediate animation.
   *
   * Setting to `0.5` means "start from the middle of the easing function".
   *
   * Any number `>= 0` and `<= 1` makes sense here.
   */

  /**
   * Animation length in number of milliseconds.
   */

  /**
   * The animation curve. Only used when `duration` is defined.
   *
   * Defaults to quadratic ease-in-out.
   */

  /**
   * Avoid overshooting by ending abruptly at the goal value.
   */

  /**
   * When above zero, the spring will bounce instead of overshooting when
   * exceeding its goal value. Its velocity is multiplied by `-1 + bounce`
   * whenever its current value equals or exceeds its goal. For example,
   * setting `bounce` to `0.5` chops the velocity in half on each bounce,
   * in addition to any friction.
   */

  /**
   * "Decay animations" decelerate without an explicit goal value.
   * Useful for scrolling animations.
   *
   * Use `true` for the default exponential decay factor (`0.998`).
   *
   * When a `number` between `0` and `1` is given, a lower number makes the
   * animation slow down faster. And setting to `1` would make an unending
   * animation.
   */

  /**
   * While animating, round to the nearest multiple of this number.
   * The `from` and `to` values are never rounded, as well as any value
   * passed to the `set` method of an animated value.
   */
  function AnimationConfig() {
    this.tension = void 0;
    this.friction = void 0;
    this.frequency = void 0;
    this.damping = void 0;
    this.mass = void 0;
    this.velocity = 0;
    this.restVelocity = void 0;
    this.precision = void 0;
    this.progress = void 0;
    this.duration = void 0;
    this.easing = void 0;
    this.clamp = void 0;
    this.bounce = void 0;
    this.decay = void 0;
    this.round = void 0;
    Object.assign(this, defaults);
  };

  function mergeConfig(config, newConfig, defaultConfig) {
    if (defaultConfig) {
      defaultConfig = _extends({}, defaultConfig);
      sanitizeConfig(defaultConfig, newConfig);
      newConfig = _extends(_extends({}, defaultConfig), newConfig);
    }

    sanitizeConfig(config, newConfig);
    Object.assign(config, newConfig);

    for (var key in defaults) {
      if (config[key] == null) {
        config[key] = defaults[key];
      }
    }

    var mass = config.mass,
        frequency = config.frequency,
        damping = config.damping;

    if (!is.und(frequency)) {
      if (frequency < 0.01) frequency = 0.01;
      if (damping < 0) damping = 0;
      config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
      config.friction = 4 * Math.PI * damping * mass / frequency;
    }

    return config;
  } // Prevent a config from accidentally overriding new props.
  // This depends on which "config" props take precedence when defined.


  function sanitizeConfig(config, props) {
    if (!is.und(props.decay)) {
      config.duration = undefined;
    } else {
      var isTensionConfig = !is.und(props.tension) || !is.und(props.friction);

      if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
        config.duration = undefined;
        config.decay = undefined;
      }

      if (isTensionConfig) {
        config.frequency = undefined;
      }
    }
  }

  var emptyArray = [];
  /** @internal */

  /** An animation being executed by the frameloop */

  var Animation = function Animation() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.to = void 0;
    this.from = void 0;
    this.config = new AnimationConfig();
    this.immediate = false;
    this.onStart = void 0;
    this.onChange = void 0;
    this.onRest = [];
  }; // @see https://github.com/alexreardon/use-memo-one/pull/10


  var useMemo = function useMemo(create, deps) {
    return useMemoOne(create, deps || [{}]);
  };

  function callProp(value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return is.fun(value) ? value.apply(void 0, args) : value;
  }
  /** Try to coerce the given value into a boolean using the given key */


  var matchProp = function matchProp(value, key) {
    return value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
  };

  var getProps = function getProps(props, i, arg) {
    return props && (is.fun(props) ? props(i, arg) : is.arr(props) ? props[i] : _extends({}, props));
  };
  /** Returns `true` if the given prop is having its default value set. */


  var hasDefaultProp = function hasDefaultProp(props, key) {
    return !is.und(getDefaultProp(props, key));
  };
  /** Get the default value being set for the given `key` */


  var getDefaultProp = function getDefaultProp(props, key) {
    return props["default"] === true ? props[key] : props["default"] ? props["default"][key] : undefined;
  };
  /**
   * Extract the default props from an update.
   *
   * When the `default` prop is falsy, this function still behaves as if
   * `default: true` was used. The `default` prop is always respected when
   * truthy.
   */


  var getDefaultProps = function getDefaultProps(props, omitKeys, defaults) {
    if (omitKeys === void 0) {
      omitKeys = [];
    }

    if (defaults === void 0) {
      defaults = {};
    }

    var keys = DEFAULT_PROPS;

    if (props["default"] && props["default"] !== true) {
      props = props["default"];
      keys = Object.keys(props);
    }

    for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
      var key = _step.value;
      var value = props[key];

      if (!is.und(value) && !omitKeys.includes(key)) {
        defaults[key] = value;
      }
    }

    return defaults;
  };
  /** Merge the default props of an update into a props cache. */


  var mergeDefaultProps = function mergeDefaultProps(defaults, props, omitKeys) {
    return getDefaultProps(props, omitKeys, defaults);
  };
  /** These props can have default values */


  var DEFAULT_PROPS = ['pause', 'cancel', 'config', 'immediate', 'onDelayEnd', 'onProps', 'onStart', 'onChange', 'onRest'];
  var RESERVED_PROPS = {
    config: 1,
    from: 1,
    to: 1,
    ref: 1,
    loop: 1,
    reset: 1,
    pause: 1,
    cancel: 1,
    reverse: 1,
    immediate: 1,
    "default": 1,
    delay: 1,
    onDelayEnd: 1,
    onProps: 1,
    onStart: 1,
    onChange: 1,
    onRest: 1,
    // Transition props
    items: 1,
    trail: 1,
    sort: 1,
    expires: 1,
    initial: 1,
    enter: 1,
    update: 1,
    leave: 1,
    children: 1,
    // Internal props
    keys: 1,
    callId: 1,
    parentId: 1
  };
  /**
   * Extract any properties whose keys are *not* reserved for customizing your
   * animations. All hooks use this function, which means `useTransition` props
   * are reserved for `useSpring` calls, etc.
   */

  function getForwardProps(props) {
    var forward = {};
    var count = 0;

    each(props, function (value, prop) {
      if (!RESERVED_PROPS[prop]) {
        forward[prop] = value;
        count++;
      }
    });

    if (count) {
      return forward;
    }
  }
  /**
   * Clone the given `props` and move all non-reserved props
   * into the `to` prop.
   */


  function inferTo(props) {
    var to = getForwardProps(props);

    if (to) {
      var out = {
        to: to
      };

      each(props, function (val, key) {
        return key in to || (out[key] = val);
      });

      return out;
    }

    return _extends({}, props);
  } // Compute the goal value, converting "red" to "rgba(255, 0, 0, 1)" in the process


  function computeGoal(value) {
    var config = getFluidConfig(value);
    return config ? computeGoal(config.get()) : is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? createStringInterpolator({
      range: [0, 1],
      output: [value, value]
    })(1) : value;
  }
  /**
   * This function sets a timeout if both the `delay` prop exists and
   * the `cancel` prop is not `true`.
   *
   * The `actions.start` function must handle the `cancel` prop itself,
   * but the `pause` prop is taken care of.
   */


  function scheduleProps(callId, _ref3) {
    var key = _ref3.key,
        props = _ref3.props,
        state = _ref3.state,
        actions = _ref3.actions;
    return new Promise(function (resolve, reject) {
      var delay;
      var timeout;
      var pause = false;
      var cancel = matchProp(props.cancel, key);

      if (cancel) {
        onStart();
      } else {
        delay = callProp(props.delay || 0, key);
        pause = matchProp(props.pause, key);

        if (pause) {
          state.resumeQueue.add(onResume);
          actions.pause();
        } else {
          actions.resume();
          onResume();
        }
      }

      function onPause() {
        state.resumeQueue.add(onResume);
        timeout.cancel(); // Cache the remaining delay.

        delay = timeout.time - now();
      }

      function onResume() {
        if (delay > 0) {
          state.pauseQueue.add(onPause);
          timeout = frameLoop.setTimeout(onStart, delay);
        } else {
          onStart();
        }
      }

      function onStart() {
        state.pauseQueue["delete"](onPause); // Maybe cancelled during its delay.

        if (callId <= (state.cancelId || 0)) {
          cancel = true;
        }

        try {
          actions.start(_extends(_extends({}, props), {}, {
            callId: callId,
            delay: delay,
            cancel: cancel,
            pause: pause
          }), resolve);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
  /** @internal */

  /** The object given to the `onRest` prop and `start` promise. */

  /** The promised result of an animation. */

  /** @internal */


  var getCombinedResult = function getCombinedResult(target, results) {
    return results.length == 1 ? results[0] : results.some(function (result) {
      return result.cancelled;
    }) ? getCancelledResult(target) : results.every(function (result) {
      return result.noop;
    }) ? getNoopResult(target) : getFinishedResult(target, results.every(function (result) {
      return result.finished;
    }));
  };
  /** No-op results are for updates that never start an animation. */


  var getNoopResult = function getNoopResult(target, value) {
    if (value === void 0) {
      value = target.get();
    }

    return {
      value: value,
      noop: true,
      finished: true,
      target: target
    };
  };

  var getFinishedResult = function getFinishedResult(target, finished, value) {
    if (value === void 0) {
      value = target.get();
    }

    return {
      value: value,
      finished: finished,
      target: target
    };
  };

  var getCancelledResult = function getCancelledResult(target, value) {
    if (value === void 0) {
      value = target.get();
    }

    return {
      value: value,
      cancelled: true,
      target: target
    };
  };
  /**
   * Start an async chain or an async script.
   *
   * Always call `runAsync` in the action callback of a `scheduleProps` call.
   *
   * The `T` parameter can be a set of animated values (as an object type)
   * or a primitive type for a single animated value.
   */


  function runAsync(_x, _x2, _x3, _x4) {
    return _runAsync.apply(this, arguments);
  }

  function _runAsync() {
    _runAsync = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(to, props, state, target) {
      var callId, parentId, onRest, prevTo, prevPromise;
      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!props.pause) {
                _context6.next = 3;
                break;
              }

              _context6.next = 3;
              return new Promise(function (resume) {
                state.resumeQueue.add(resume);
              });

            case 3:
              callId = props.callId, parentId = props.parentId, onRest = props.onRest;
              prevTo = state.asyncTo, prevPromise = state.promise;

              if (!(!parentId && to === prevTo && !props.reset)) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", prevPromise);

            case 7:
              return _context6.abrupt("return", state.promise = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
                var defaultProps, preventBail, bail, bailPromise, withBailHandler, bailIfEnded, animate, result, animating;
                return regenerator.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        state.asyncId = callId;
                        state.asyncTo = to; // The default props of any `animate` calls.

                        defaultProps = getDefaultProps(props, [// The `onRest` prop is only called when the `runAsync` promise is resolved.
                        'onRest']);
                        // This promise is rejected when the animation is interrupted.
                        bailPromise = new Promise(function (resolve, reject) {
                          return preventBail = resolve, bail = reject;
                        }); // Stop animating when an error is caught.

                        withBailHandler = function withBailHandler(fn) {
                          return function () {
                            var onError = function onError(err) {
                              if (err instanceof BailSignal) {
                                bail(err); // Stop animating.
                              }

                              throw err;
                            };

                            try {
                              return fn.apply(void 0, arguments)["catch"](onError);
                            } catch (err) {
                              onError(err);
                            }
                          };
                        };

                        bailIfEnded = function bailIfEnded(bailSignal) {
                          var bailResult = // The `cancel` prop or `stop` method was used.
                          callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
                          callId !== state.asyncId && getFinishedResult(target, false);

                          if (bailResult) {
                            bailSignal.result = bailResult;
                            throw bailSignal;
                          }
                        }; // Note: This function cannot use the `async` keyword, because we want the
                        // `throw` statements to interrupt the caller.


                        animate = withBailHandler(function (arg1, arg2) {
                          var bailSignal = new BailSignal();
                          bailIfEnded(bailSignal);
                          var props = is.obj(arg1) ? _extends({}, arg1) : _extends(_extends({}, arg2), {}, {
                            to: arg1
                          });
                          props.parentId = callId;

                          each(defaultProps, function (value, key) {
                            if (is.und(props[key])) {
                              props[key] = value;
                            }
                          });

                          return target.start(props).then( /*#__PURE__*/function () {
                            var _ref14 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(result) {
                              return regenerator.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      bailIfEnded(bailSignal);

                                      if (!target.is('PAUSED')) {
                                        _context3.next = 4;
                                        break;
                                      }

                                      _context3.next = 4;
                                      return new Promise(function (resume) {
                                        state.resumeQueue.add(resume);
                                      });

                                    case 4:
                                      return _context3.abrupt("return", result);

                                    case 5:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            return function (_x7) {
                              return _ref14.apply(this, arguments);
                            };
                          }());
                        });
                        _context5.prev = 7;

                        // Async sequence
                        if (is.arr(to)) {
                          animating = function () {
                            var _ref15 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(queue) {
                              var _iterator2, _step2, _props2;

                              return regenerator.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      _iterator2 = _createForOfIteratorHelperLoose(queue);

                                    case 1:
                                      if ((_step2 = _iterator2()).done) {
                                        _context4.next = 7;
                                        break;
                                      }

                                      _props2 = _step2.value;
                                      _context4.next = 5;
                                      return animate(_props2);

                                    case 5:
                                      _context4.next = 1;
                                      break;

                                    case 7:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4);
                            }));

                            return function (_x8) {
                              return _ref15.apply(this, arguments);
                            };
                          }()(to);
                        } // Async script
                        else if (is.fun(to)) {
                            animating = Promise.resolve(to(animate, target.stop.bind(target)));
                          }

                        _context5.next = 11;
                        return Promise.all([animating.then(preventBail), bailPromise]);

                      case 11:
                        result = getFinishedResult(target, true); // Bail handling

                        _context5.next = 21;
                        break;

                      case 14:
                        _context5.prev = 14;
                        _context5.t0 = _context5["catch"](7);

                        if (!(_context5.t0 instanceof BailSignal)) {
                          _context5.next = 20;
                          break;
                        }

                        result = _context5.t0.result;
                        _context5.next = 21;
                        break;

                      case 20:
                        throw _context5.t0;

                      case 21:
                        _context5.prev = 21;

                        if (callId == state.asyncId) {
                          state.asyncId = parentId;
                          state.asyncTo = parentId ? prevTo : undefined;
                          state.promise = parentId ? prevPromise : undefined;
                        }

                        return _context5.finish(21);

                      case 24:
                        if (is.fun(onRest)) {
                          batchedUpdates(function () {
                            onRest(result);
                          });
                        }

                        return _context5.abrupt("return", result);

                      case 26:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[7, 14, 21, 24]]);
              }))());

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _runAsync.apply(this, arguments);
  }

  function cancelAsync(state, callId) {
    state.cancelId = callId;
    state.asyncId = state.asyncTo = state.promise = undefined;
  }
  /** This error is thrown to signal an interrupted async animation. */


  var BailSignal = /*#__PURE__*/function (_Error) {
    inheritsLoose$1(BailSignal, _Error);

    function BailSignal() {
      var _this;

      _this = _Error.call(this, 'An async animation has been interrupted. You see this error because you ' + 'forgot to use `await` or `.catch(...)` on its returned promise.') || this;
      _this.result = void 0;
      return _this;
    }

    return BailSignal;
  }( /*#__PURE__*/wrapNativeSuper(Error));

  var isFrameValue = function isFrameValue(value) {
    return value instanceof FrameValue;
  };

  var nextId = 1;
  /**
   * A kind of `FluidValue` that manages an `AnimatedValue` node.
   *
   * Its underlying value can be accessed and even observed.
   */

  var FrameValue = /*#__PURE__*/function (_FluidValue) {
    inheritsLoose$1(FrameValue, _FluidValue);

    function FrameValue() {
      var _this2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _FluidValue.call.apply(_FluidValue, [this].concat(args)) || this;
      _this2.id = nextId++;
      _this2.key = void 0;
      _this2._priority = 0;
      _this2._children = new Set();
      return _this2;
    }

    var _proto = FrameValue.prototype;

    /** Get the current value */
    _proto.get = function get() {
      var node = getAnimated(this);
      return node && node.getValue();
    }
    /** Create a spring that maps our value to another value */
    ;

    _proto.to = function to$1() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return to(this, args);
    }
    /** @deprecated Use the `to` method instead. */
    ;

    _proto.interpolate = function interpolate() {
      deprecateInterpolate();

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return to(this, args);
    }
    /** @internal */

    /** @internal */
    ;

    _proto.addChild = function addChild(child) {
      if (!this._children.size) this._attach();

      this._children.add(child);
    }
    /** @internal */
    ;

    _proto.removeChild = function removeChild(child) {
      this._children["delete"](child);

      if (!this._children.size) this._detach();
    }
    /** @internal */
    ;

    _proto.onParentChange = function onParentChange(_ref4) {
      var type = _ref4.type;

      if (this.idle) {
        // Start animating when a parent does.
        if (type == 'start') {
          this._reset();

          this._start();
        }
      } // Reset our animation state when a parent does, but only when
      // our animation is active.
      else if (type == 'reset') {
          this._reset();
        }
    }
    /** Called when the first child is added. */
    ;

    _proto._attach = function _attach() {}
    /** Called when the last child is removed. */
    ;

    _proto._detach = function _detach() {}
    /**
     * Reset our animation state (eg: start values, velocity, etc)
     * and tell our children to do the same.
     *
     * This is called when our goal value is changed during (or before)
     * an animation.
     */
    ;

    _proto._reset = function _reset() {
      this._emit({
        type: 'reset',
        parent: this
      });
    }
    /**
     * Start animating if possible.
     *
     * Note: Be sure to call `_reset` first, or the animation will break.
     * This method would like to call `_reset` for you, but that would
     * interfere with paused animations.
     */
    ;

    _proto._start = function _start() {
      this._emit({
        type: 'start',
        parent: this
      });
    }
    /** Tell our children about our new value */
    ;

    _proto._onChange = function _onChange(value, idle) {
      if (idle === void 0) {
        idle = false;
      }

      this._emit({
        type: 'change',
        parent: this,
        value: value,
        idle: idle
      });
    }
    /** Tell our children about our new priority */
    ;

    _proto._onPriorityChange = function _onPriorityChange(priority) {
      if (!this.idle) {
        // Make the frameloop aware of our new priority.
        frameLoop.start(this);
      }

      this._emit({
        type: 'priority',
        parent: this,
        priority: priority
      });
    };

    _proto._emit = function _emit(event) {
      // Clone "_children" so it can be safely mutated inside the loop.
      each(Array.from(this._children), function (child) {
        child.onParentChange(event);
      });
    };

    createClass(FrameValue, [{
      key: "priority",
      get: function get() {
        return this._priority;
      },
      set: function set(priority) {
        if (this._priority != priority) {
          this._priority = priority;

          this._onPriorityChange(priority);
        }
      }
    }]);

    return FrameValue;
  }(FluidValue); // TODO: use "const enum" when Babel supports it

  /** The spring has not animated yet */


  var CREATED = 'CREATED';
  /** The spring has animated before */

  var IDLE = 'IDLE';
  /** The spring is animating */

  var ACTIVE = 'ACTIVE';
  /** The spring is frozen in time */

  var PAUSED = 'PAUSED';
  /** The spring cannot be animated */

  var DISPOSED = 'DISPOSED';
  /**
   * Only numbers, strings, and arrays of numbers/strings are supported.
   * Non-animatable strings are also supported.
   */

  var SpringValue = /*#__PURE__*/function (_FrameValue) {
    inheritsLoose$1(SpringValue, _FrameValue);

    /** The property name used when `to` or `from` is an object. Useful when debugging too. */

    /** The animation state */

    /** The queue of pending props */

    /** The lifecycle phase of this spring */

    /** The state for `runAsync` calls */

    /** Some props have customizable default values */

    /** The counter for tracking `scheduleProps` calls */

    /** The last `scheduleProps` call that changed the `to` prop */
    function SpringValue(arg1, arg2) {
      var _this3;

      _this3 = _FrameValue.call(this) || this;
      _this3.key = void 0;
      _this3.animation = new Animation();
      _this3.queue = void 0;
      _this3._phase = CREATED;
      _this3._state = {
        pauseQueue: new Set(),
        resumeQueue: new Set()
      };
      _this3._defaultProps = {};
      _this3._lastCallId = 0;
      _this3._lastToId = 0;

      if (!is.und(arg1) || !is.und(arg2)) {
        var props = is.obj(arg1) ? _extends({}, arg1) : _extends(_extends({}, arg2), {}, {
          from: arg1
        });
        props["default"] = true;

        _this3.start(props);
      }

      return _this3;
    }

    var _proto2 = SpringValue.prototype;

    /** Advance the current animation by a number of milliseconds */
    _proto2.advance = function advance(dt) {
      var _this4 = this;

      var idle = true;
      var changed = false;
      var anim = this.animation;
      var config = anim.config,
          toValues = anim.toValues;
      var payload = getPayload(anim.to);

      if (!payload) {
        var toConfig = getFluidConfig(anim.to);

        if (toConfig) {
          toValues = toArray(toConfig.get());
        }
      }

      anim.values.forEach(function (node, i) {
        if (node.done) return; // The "anim.toValues" array must exist when no parent exists.

        var to = payload ? payload[i].lastPosition : toValues[i];
        var finished = anim.immediate;
        var position = to;

        if (!finished) {
          position = node.lastPosition; // Loose springs never move.

          if (config.tension <= 0) {
            node.done = true;
            return;
          }

          var elapsed = node.elapsedTime += dt;
          var from = anim.fromValues[i];
          var v0 = node.v0 != null ? node.v0 : node.v0 = is.arr(config.velocity) ? config.velocity[i] : config.velocity;
          var velocity; // Duration easing

          if (!is.und(config.duration)) {
            var p = config.progress || 0;
            if (config.duration <= 0) p = 1;else p += (1 - p) * Math.min(1, elapsed / config.duration);
            position = from + config.easing(p) * (to - from);
            velocity = (position - node.lastPosition) / dt;
            finished = p == 1;
          } // Decay easing
          else if (config.decay) {
              var decay = config.decay === true ? 0.998 : config.decay;
              var e = Math.exp(-(1 - decay) * elapsed);
              position = from + v0 / (1 - decay) * (1 - e);
              finished = Math.abs(node.lastPosition - position) < 0.1; // derivative of position

              velocity = v0 * e;
            } // Spring easing
            else {
                velocity = node.lastVelocity == null ? v0 : node.lastVelocity;
                /** The smallest distance from a value before being treated like said value. */

                var precision = config.precision || (from == to ? 0.005 : Math.min(1, Math.abs(to - from) * 0.001));
                /** The velocity at which movement is essentially none */

                var restVelocity = config.restVelocity || precision / 10; // Bouncing is opt-in (not to be confused with overshooting)

                var bounceFactor = config.clamp ? 0 : config.bounce;
                var canBounce = !is.und(bounceFactor);
                /** When `true`, the value is increasing over time */

                var isGrowing = from == to ? node.v0 > 0 : from < to;
                /** When `true`, the velocity is considered moving */

                var isMoving;
                /** When `true`, the velocity is being deflected or clamped */

                var isBouncing = false;
                var step = 1; // 1ms

                var numSteps = Math.ceil(dt / step);

                for (var n = 0; n < numSteps; ++n) {
                  isMoving = Math.abs(velocity) > restVelocity;

                  if (!isMoving) {
                    finished = Math.abs(to - position) <= precision;

                    if (finished) {
                      break;
                    }
                  }

                  if (canBounce) {
                    isBouncing = position == to || position > to == isGrowing; // Invert the velocity with a magnitude, or clamp it.

                    if (isBouncing) {
                      velocity = -velocity * bounceFactor;
                      position = to;
                    }
                  }

                  var springForce = -config.tension * 0.000001 * (position - to);
                  var dampingForce = -config.friction * 0.001 * velocity;
                  var acceleration = (springForce + dampingForce) / config.mass; // pt/ms^2

                  velocity = velocity + acceleration * step; // pt/ms

                  position = position + velocity * step;
                }
              }

          node.lastVelocity = velocity;

          if (Number.isNaN(position)) {
            console.warn("Got NaN while animating:", _this4);
            finished = true;
          }
        } // Parent springs must finish before their children can.


        if (payload && !payload[i].done) {
          finished = false;
        }

        if (finished) {
          node.done = true;
        } else {
          idle = false;
        }

        if (node.setValue(position, config.round)) {
          changed = true;
        }
      });

      if (idle) {
        this.finish();
      } else if (changed) {
        this._onChange(this.get());
      }

      return idle;
    }
    /** Check the current phase */
    ;

    _proto2.is = function is(phase) {
      return this._phase == phase;
    }
    /** Set the current value, while stopping the current animation */
    ;

    _proto2.set = function set(value) {
      var _this5 = this;

      batchedUpdates(function () {
        _this5._focus(value);

        if (_this5._set(value)) {
          // Ensure change observers are notified. When active,
          // the "_stop" method handles this.
          if (!_this5.is(ACTIVE)) {
            return _this5._onChange(_this5.get(), true);
          }
        }

        _this5._stop();
      });
      return this;
    }
    /**
     * Freeze the active animation in time.
     * This does nothing when not animating.
     */
    ;

    _proto2.pause = function pause() {
      checkDisposed(this, 'pause');

      if (!this.is(PAUSED)) {
        this._phase = PAUSED;
        flush(this._state.pauseQueue, function (onPause) {
          return onPause();
        });
      }
    }
    /** Resume the animation if paused. */
    ;

    _proto2.resume = function resume() {
      checkDisposed(this, 'resume');

      if (this.is(PAUSED)) {
        this._start();

        flush(this._state.resumeQueue, function (onResume) {
          return onResume();
        });
      }
    }
    /**
     * Skip to the end of the current animation.
     *
     * All `onRest` callbacks are passed `{finished: true}`
     */
    ;

    _proto2.finish = function finish(to) {
      var _this6 = this;

      this.resume();

      if (this.is(ACTIVE)) {
        var anim = this.animation; // Decay animations have an implicit goal.

        if (!anim.config.decay && is.und(to)) {
          to = anim.to;
        } // Set the value if we can.


        if (!is.und(to)) {
          this._set(to);
        }

        batchedUpdates(function () {
          // Ensure the "onStart" and "onRest" props are called.
          if (!anim.changed) {
            anim.changed = true;

            if (anim.onStart) {
              anim.onStart(_this6);
            }
          } // Exit the frameloop.


          _this6._stop();
        });
      }

      return this;
    }
    /** Push props into the pending queue. */
    ;

    _proto2.update = function update(props) {
      checkDisposed(this, 'update');
      var queue = this.queue || (this.queue = []);
      queue.push(props);
      return this;
    }
    /**
     * Update this value's animation using the queue of pending props,
     * and unpause the current animation (if one is frozen).
     *
     * When arguments are passed, a new animation is created, and the
     * queued animations are left alone.
     */
    ;

    _proto2.start =
    /*#__PURE__*/
    function () {
      var _start2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(to, arg2) {
        var _this7 = this;

        var queue, results;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                checkDisposed(this, 'start');

                if (!is.und(to)) {
                  queue = [is.obj(to) ? to : _extends(_extends({}, arg2), {}, {
                    to: to
                  })];
                } else {
                  queue = this.queue || [];
                  this.queue = [];
                }

                _context.next = 4;
                return Promise.all(queue.map(function (props) {
                  return _this7._update(props);
                }));

              case 4:
                results = _context.sent;
                return _context.abrupt("return", getCombinedResult(this, results));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x5, _x6) {
        return _start2.apply(this, arguments);
      }

      return start;
    }()
    /**
     * Stop the current animation, and cancel any delayed updates.
     *
     * Pass `true` to call `onRest` with `cancelled: true`.
     */
    ;

    _proto2.stop = function stop(cancel) {
      var _this8 = this;

      if (!this.is(DISPOSED)) {
        cancelAsync(this._state, this._lastCallId); // Ensure the `to` value equals the current value.

        this._focus(this.get()); // Exit the frameloop and notify `onRest` listeners.


        batchedUpdates(function () {
          return _this8._stop(cancel);
        });
      }

      return this;
    }
    /** Restart the animation. */
    ;

    _proto2.reset = function reset() {
      this._update({
        reset: true
      });
    }
    /** Prevent future animations, and stop the current animation */
    ;

    _proto2.dispose = function dispose() {
      if (!this.is(DISPOSED)) {
        if (this.animation) {
          // Prevent "onRest" calls when disposed.
          this.animation.onRest = [];
        }

        this.stop();
        this._phase = DISPOSED;
      }
    }
    /** @internal */
    ;

    _proto2.onParentChange = function onParentChange(event) {
      _FrameValue.prototype.onParentChange.call(this, event);

      if (event.type == 'change') {
        if (!this.is(ACTIVE)) {
          this._reset();

          if (!this.is(PAUSED)) {
            this._start();
          }
        }
      } else if (event.type == 'priority') {
        this.priority = event.priority + 1;
      }
    }
    /**
     * Parse the `to` and `from` range from the given `props` object.
     *
     * This also ensures the initial value is available to animated components
     * during the render phase.
     */
    ;

    _proto2._prepareNode = function _prepareNode(_ref5) {
      var to = _ref5.to,
          from = _ref5.from,
          reverse = _ref5.reverse;
      var key = this.key || '';
      to = !is.obj(to) || getFluidConfig(to) ? to : to[key];
      from = !is.obj(from) || getFluidConfig(from) ? from : from[key]; // Create the range now to avoid "reverse" logic.

      var range = {
        to: to,
        from: from
      }; // Before ever animating, this method ensures an `Animated` node
      // exists and keeps its value in sync with the "from" prop.

      if (this.is(CREATED)) {
        if (reverse) {
          var _ref6 = [from, to];
          to = _ref6[0];
          from = _ref6[1];
        }

        from = getFluidValue(from);

        var node = this._updateNode(is.und(from) ? getFluidValue(to) : from);

        if (node && !is.und(from)) {
          node.setValue(from);
        }
      }

      return range;
    }
    /**
     * Create an `Animated` node if none exists or the given value has an
     * incompatible type. Do nothing if `value` is undefined.
     *
     * The newest `Animated` node is returned.
     */
    ;

    _proto2._updateNode = function _updateNode(value) {
      var node = getAnimated(this);

      if (!is.und(value)) {
        var nodeType = this._getNodeType(value);

        if (!node || node.constructor !== nodeType) {
          setAnimated(this, node = nodeType.create(value));
        }
      }

      return node;
    }
    /** Return the `Animated` node constructor for a given value */
    ;

    _proto2._getNodeType = function _getNodeType(value) {
      var parentNode = getAnimated(value);
      return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
    }
    /** Schedule an animation to run after an optional delay */
    ;

    _proto2._update = function _update(props, isLoop) {
      var _this9 = this;

      var defaultProps = this._defaultProps;

      var mergeDefaultProp = function mergeDefaultProp(key) {
        var value = getDefaultProp(props, key);

        if (!is.und(value)) {
          defaultProps[key] = value;
        } // For `cancel` and `pause`, a truthy default always wins.


        if (defaultProps[key]) {
          props[key] = defaultProps[key];
        }
      }; // These props are coerced into booleans by the `scheduleProps` function,
      // so they need their default values processed before then.


      mergeDefaultProp('cancel');
      mergeDefaultProp('pause'); // Ensure the initial value can be accessed by animated components.

      var range = this._prepareNode(props);

      return scheduleProps(++this._lastCallId, {
        key: this.key,
        props: props,
        state: this._state,
        actions: {
          pause: this.pause.bind(this),
          resume: this.resume.bind(this),
          start: this._merge.bind(this, range)
        }
      }).then(function (result) {
        if (props.loop && result.finished && !(isLoop && result.noop)) {
          var nextProps = createLoopUpdate(props);

          if (nextProps) {
            return _this9._update(nextProps, true);
          }
        }

        return result;
      });
    }
    /** Merge props into the current animation */
    ;

    _proto2._merge = function _merge(range, props, resolve) {
      // The "cancel" prop cancels all pending delays and it forces the
      // active animation to stop where it is.
      if (props.cancel) {
        this.stop(true);
        return resolve(getCancelledResult(this));
      }

      var key = this.key,
          anim = this.animation;
      var defaultProps = this._defaultProps;
      /** The "to" prop is defined. */

      var hasToProp = !is.und(range.to);
      /** The "from" prop is defined. */

      var hasFromProp = !is.und(range.from); // Avoid merging other props if implicitly prevented, except
      // when both the "to" and "from" props are undefined.

      if (hasToProp || hasFromProp) {
        if (props.callId > this._lastToId) {
          this._lastToId = props.callId;
        } else {
          return resolve(getCancelledResult(this));
        }
      }
      /** Get the value of a prop, or its default value */


      var get = function get(prop) {
        return !is.und(props[prop]) ? props[prop] : defaultProps[prop];
      }; // Call "onDelayEnd" before merging props, but after cancellation checks.


      var onDelayEnd = coerceEventProp(get('onDelayEnd'), key);

      if (onDelayEnd) {
        onDelayEnd(props, this);
      }

      if (props["default"]) {
        mergeDefaultProps(defaultProps, props, ['pause', 'cancel']);
      }

      var prevTo = anim.to,
          prevFrom = anim.from;
      var _range$to = range.to,
          to = _range$to === void 0 ? prevTo : _range$to,
          _range$from = range.from,
          from = _range$from === void 0 ? prevFrom : _range$from; // Focus the "from" value if changing without a "to" value.

      if (hasFromProp && !hasToProp) {
        to = from;
      } // Flip the current range if "reverse" is true.


      if (props.reverse) {
        var _ref7 = [from, to];
        to = _ref7[0];
        from = _ref7[1];
      }
      /** The "from" value is changing. */


      var hasFromChanged = !isEqual(from, prevFrom);

      if (hasFromChanged) {
        anim.from = from;
      }
      /** The "to" value is changing. */


      var hasToChanged = !isEqual(to, prevTo);

      if (hasToChanged) {
        this._focus(to);
      } // Both "from" and "to" can use a fluid config (thanks to http://npmjs.org/fluids).


      var toConfig = getFluidConfig(to);
      var fromConfig = getFluidConfig(from);

      if (fromConfig) {
        from = fromConfig.get();
      }
      /** The "to" prop is async. */


      var hasAsyncTo = is.arr(props.to) || is.fun(props.to);
      var config = anim.config;
      var decay = config.decay,
          velocity = config.velocity; // The "runAsync" function treats the "config" prop as a default,
      // so we must avoid merging it when the "to" prop is async.

      if (props.config && !hasAsyncTo) {
        mergeConfig(config, callProp(props.config, key), // Avoid calling the same "config" prop twice.
        props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
      } // This instance might not have its Animated node yet. For example,
      // the constructor can be given props without a "to" or "from" value.


      var node = getAnimated(this);

      if (!node || is.und(to)) {
        return resolve(getFinishedResult(this, true));
      }
      /** When true, start at the "from" value. */


      var reset = // When `reset` is undefined, the `from` prop implies `reset: true`,
      // except for declarative updates. When `reset` is defined, there
      // must exist a value to animate from.
      is.und(props.reset) ? hasFromProp && !props["default"] : !is.und(from) && matchProp(props.reset, key); // The current value, where the animation starts from.

      var value = reset ? from : this.get(); // The animation ends at this value, unless "to" is fluid.

      var goal = computeGoal(to); // Only specific types can be animated to/from.

      var isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal); // When true, the value changes instantly on the next frame.

      var immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));

      if (hasToChanged) {
        if (immediate) {
          node = this._updateNode(goal);
        } else {
          var nodeType = this._getNodeType(to);

          if (nodeType !== node.constructor) {
            throw Error("Cannot animate between " + node.constructor.name + " and " + nodeType.name + ", as the \"to\" prop suggests");
          }
        }
      } // The type of Animated node for the goal value.


      var goalType = node.constructor; // When the goal value is fluid, we don't know if its value
      // will change before the next animation frame, so it always
      // starts the animation to be safe.

      var started = !!toConfig;
      var finished = false;

      if (!started) {
        // When true, the current value has probably changed.
        var hasValueChanged = reset || this.is(CREATED) && hasFromChanged; // When the "to" value or current value are changed,
        // start animating if not already finished.

        if (hasToChanged || hasValueChanged) {
          finished = isEqual(computeGoal(value), goal);
          started = !finished;
        } // Changing "decay" or "velocity" starts the animation.


        if (!isEqual(config.decay, decay) || !isEqual(config.velocity, velocity)) {
          started = true;
        }
      } // When an active animation changes its goal to its current value:


      if (finished && this.is(ACTIVE)) {
        // Avoid an abrupt stop unless the animation is being reset.
        if (anim.changed && !reset) {
          started = true;
        } // Stop the animation before its first frame.
        else if (!started) {
            this._stop();
          }
      }

      if (!hasAsyncTo) {
        // Make sure our "toValues" are updated even if our previous
        // "to" prop is a fluid value whose current value is also ours.
        if (started || getFluidConfig(prevTo)) {
          anim.values = node.getPayload();
          anim.toValues = toConfig ? null : goalType == AnimatedString ? [1] : toArray(goal);
        }

        anim.immediate = immediate;
        anim.onStart = coerceEventProp(get('onStart'), key);
        anim.onChange = coerceEventProp(get('onChange'), key); // The "reset" prop tries to reuse the old "onRest" prop,
        // unless you defined a new "onRest" prop.

        var onRestQueue = anim.onRest;
        var onRest = reset && !props.onRest ? onRestQueue[0] || noop : checkFinishedOnRest(coerceEventProp(get('onRest'), key), this); // In most cases, the animation after this one won't reuse our
        // "onRest" prop. Instead, the _default_ "onRest" prop is used
        // when the next animation has an undefined "onRest" prop.

        if (started) {
          anim.onRest = [onRest, checkFinishedOnRest(resolve, this)]; // Flush the "onRest" queue for the previous animation.

          var onRestIndex = reset ? 0 : 1;

          if (onRestIndex < onRestQueue.length) {
            batchedUpdates(function () {
              for (; onRestIndex < onRestQueue.length; onRestIndex++) {
                onRestQueue[onRestIndex]();
              }
            });
          }
        } // The "onRest" prop is always first, and it can be updated even
        // if a new animation is not started by this update.
        else if (reset || props.onRest) {
            anim.onRest[0] = onRest;
          }
      } // By this point, every prop has been merged.


      var onProps = coerceEventProp(get('onProps'), key);

      if (onProps) {
        onProps(props, this);
      } // Update our node even if the animation is idle.


      if (reset) {
        node.setValue(value);
      }

      if (hasAsyncTo) {
        resolve(runAsync(props.to, props, this._state, this));
      } // Start an animation
      else if (started) {
          // Must be idle for "onStart" to be called again.
          if (reset) this._phase = IDLE;

          this._reset();

          this._start();
        } // Postpone promise resolution until the animation is finished,
        // so that no-op updates still resolve at the expected time.
        else if (this.is(ACTIVE) && !hasToChanged) {
            anim.onRest.push(checkFinishedOnRest(resolve, this));
          } // Resolve our promise immediately.
          else {
              resolve(getNoopResult(this, value));
            }
    }
    /** Update the `animation.to` value, which might be a `FluidValue` */
    ;

    _proto2._focus = function _focus(value) {
      var anim = this.animation;

      if (value !== anim.to) {
        var _config = getFluidConfig(anim.to);

        if (_config) {
          _config.removeChild(this);
        }

        anim.to = value;
        var priority = 0;

        if (_config = getFluidConfig(value)) {
          _config.addChild(this);

          if (isFrameValue(value)) {
            priority = (value.priority || 0) + 1;
          }
        }

        this.priority = priority;
      }
    }
    /** Set the current value and our `node` if necessary. The `_onChange` method is *not* called. */
    ;

    _proto2._set = function _set(value) {
      var config = getFluidConfig(value);

      if (config) {
        value = config.get();
      }

      var node = getAnimated(this);
      var oldValue = node && node.getValue();

      if (node) {
        node.setValue(value);
      } else {
        this._updateNode(value);
      }

      return !isEqual(value, oldValue);
    };

    _proto2._onChange = function _onChange(value, idle) {
      if (idle === void 0) {
        idle = false;
      }

      var anim = this.animation; // The "onStart" prop is called on the first change after entering the
      // frameloop, but never for immediate animations.

      if (!anim.changed && !idle) {
        anim.changed = true;

        if (anim.onStart) {
          anim.onStart(this);
        }
      }

      if (anim.onChange) {
        anim.onChange(value, this);
      }

      _FrameValue.prototype._onChange.call(this, value, idle);
    };

    _proto2._reset = function _reset() {
      var anim = this.animation; // Reset the state of each Animated node.

      getAnimated(this).reset(anim.to); // Ensure the `onStart` prop will be called.

      if (!this.is(ACTIVE)) {
        anim.changed = false;
      } // Use the current values as the from values.


      if (!anim.immediate) {
        anim.fromValues = anim.values.map(function (node) {
          return node.lastPosition;
        });
      }

      _FrameValue.prototype._reset.call(this);
    };

    _proto2._start = function _start() {
      if (!this.is(ACTIVE)) {
        this._phase = ACTIVE;

        _FrameValue.prototype._start.call(this); // The "skipAnimation" global avoids the frameloop.


        if (skipAnimation) {
          this.finish();
        } else {
          frameLoop.start(this);
        }
      }
    }
    /**
     * Exit the frameloop and notify `onRest` listeners.
     *
     * Always wrap `_stop` calls with `batchedUpdates`.
     */
    ;

    _proto2._stop = function _stop(cancel) {
      this.resume();

      if (this.is(ACTIVE)) {
        this._phase = IDLE; // Always let change observers know when a spring becomes idle.

        this._onChange(this.get(), true);

        var anim = this.animation;

        each(anim.values, function (node) {
          node.done = true;
        });

        var onRestQueue = anim.onRest;

        if (onRestQueue.length) {
          // Preserve the "onRest" prop when the goal is dynamic.
          anim.onRest = [anim.toValues ? noop : onRestQueue[0]]; // Never call the "onRest" prop for no-op animations.

          if (!anim.changed) {
            onRestQueue[0] = noop;
          }

          each(onRestQueue, function (onRest) {
            return onRest(cancel);
          });
        }
      }
    };

    createClass(SpringValue, [{
      key: "idle",
      get: function get() {
        return !this.is(ACTIVE) && !this._state.asyncTo;
      }
    }, {
      key: "goal",
      get: function get() {
        return getFluidValue(this.animation.to);
      }
    }, {
      key: "velocity",
      get: function get() {
        var node = getAnimated(this);
        return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map(function (node) {
          return node.lastVelocity || 0;
        });
      }
    }]);

    return SpringValue;
  }(FrameValue);

  function checkDisposed(spring, name) {
    if (spring.is(DISPOSED)) {
      throw Error("Cannot call \"" + name + "\" of disposed \"" + spring.constructor.name + "\" object");
    }
  }
  /** Coerce an event prop to an event handler */


  function coerceEventProp(prop, key) {
    return is.fun(prop) ? prop : key && prop ? prop[key] : undefined;
  }
  /**
   * The "finished" value is determined by each "onRest" handler,
   * based on whether the current value equals the goal value that
   * was calculated at the time the "onRest" handler was set.
   */


  var checkFinishedOnRest = function checkFinishedOnRest(onRest, spring) {
    var to = spring.animation.to;
    return onRest ? function (cancel) {
      if (cancel) {
        onRest(getCancelledResult(spring));
      } else {
        var goal = computeGoal(to);
        var value = computeGoal(spring.get());
        var finished = isEqual(value, goal);
        onRest(getFinishedResult(spring, finished));
      }
    } : noop;
  };

  function createLoopUpdate(props, loop, to) {
    if (loop === void 0) {
      loop = props.loop;
    }

    if (to === void 0) {
      to = props.to;
    }

    var loopRet = callProp(loop);

    if (loopRet) {
      var overrides = loopRet !== true && inferTo(loopRet);
      var reverse = (overrides || props).reverse;
      var reset = !overrides || overrides.reset;
      return createUpdate(_extends(_extends({}, props), {}, {
        loop: loop,
        // Avoid updating default props when looping.
        "default": false,
        // For the "reverse" prop to loop as expected, the "to" prop
        // must be undefined. The "reverse" prop is ignored when the
        // "to" prop is an array or function.
        to: !reverse || is.arr(to) || is.fun(to) ? to : undefined,
        // Avoid defining the "from" prop if a reset is unwanted.
        from: reset ? props.from : undefined,
        reset: reset
      }, overrides));
    }
  }
  /**
   * Return a new object based on the given `props`.
   *
   * - All unreserved props are moved into the `to` prop object.
   * - The `to` and `from` props are deleted when falsy.
   * - The `keys` prop is set to an array of affected keys,
   *   or `null` if all keys are affected.
   */


  function createUpdate(props) {
    var _props = props = inferTo(props),
        to = _props.to,
        from = _props.from; // Collect the keys affected by this update.


    var keys = new Set();

    if (from) {
      findDefined(from, keys);
    } else {
      // Falsy values are deleted to avoid merging issues.
      delete props.from;
    }

    if (is.obj(to)) {
      findDefined(to, keys);
    } else if (!to) {
      // Falsy values are deleted to avoid merging issues.
      delete props.to;
    } // The "keys" prop helps in applying updates to affected keys only.


    props.keys = keys.size ? Array.from(keys) : null;
    return props;
  }
  /**
   * A modified version of `createUpdate` meant for declarative APIs.
   */


  function declareUpdate(props) {
    var update = createUpdate(props);

    if (is.und(update["default"])) {
      update["default"] = getDefaultProps(update, [// Avoid forcing `immediate: true` onto imperative updates.
      update.immediate === true && 'immediate']);
    }

    return update;
  }
  /** Find keys with defined values */


  function findDefined(values, keys) {
    each(values, function (value, key) {
      return value != null && keys.add(key);
    });
  }
  /** Events batched by the `Controller` class */


  var BATCHED_EVENTS = ['onStart', 'onChange', 'onRest'];
  var nextId$1 = 1;
  /** Queue of pending updates for a `Controller` instance. */

  var Controller = /*#__PURE__*/function () {
    /** The animated values */

    /** The queue of props passed to the `update` method. */

    /** Custom handler for flushing update queues */

    /** These props are used by all future spring values */

    /** The combined phase of our spring values */

    /** The counter for tracking `scheduleProps` calls */

    /** The values currently being animated */

    /** State used by the `runAsync` function */

    /** The event queues that are flushed once per frame maximum */
    function Controller(props, flush) {
      this.id = nextId$1++;
      this.springs = {};
      this.queue = [];
      this._flush = void 0;
      this._initialProps = void 0;
      this._phase = CREATED;
      this._lastAsyncId = 0;
      this._active = new Set();
      this._state = {
        pauseQueue: new Set(),
        resumeQueue: new Set()
      };
      this._events = {
        onStart: new Set(),
        onChange: new Set(),
        onRest: new Map()
      };
      this._onFrame = this._onFrame.bind(this);

      if (flush) {
        this._flush = flush;
      }

      if (props) {
        this.start(props);
      }
    }
    /**
     * Equals `true` when no spring values are in the frameloop, and
     * no async animation is currently active.
     */


    var _proto3 = Controller.prototype;

    /** Check the current phase */
    _proto3.is = function is(phase) {
      return this._phase == phase;
    }
    /** Get the current values of our springs */
    ;

    _proto3.get = function get() {
      var values = {};
      this.each(function (spring, key) {
        return values[key] = spring.get();
      });
      return values;
    }
    /** Push an update onto the queue of each value. */
    ;

    _proto3.update = function update(props) {
      if (props) this.queue.push(createUpdate(props));
      return this;
    }
    /**
     * Start the queued animations for every spring, and resolve the returned
     * promise once all queued animations have finished or been cancelled.
     *
     * When you pass a queue (instead of nothing), that queue is used instead of
     * the queued animations added with the `update` method, which are left alone.
     */
    ;

    _proto3.start = function start(props) {
      var queue = props ? toArray(props).map(createUpdate) : this.queue;

      if (!props) {
        this.queue = [];
      }

      if (this._flush) {
        return this._flush(this, queue);
      }

      prepareKeys(this, queue);
      return flushUpdateQueue(this, queue);
    }
    /** Stop one animation, some animations, or all animations */
    ;

    _proto3.stop = function stop(keys) {
      if (is.und(keys)) {
        this.each(function (spring) {
          return spring.stop();
        });
        cancelAsync(this._state, this._lastAsyncId);
      } else {
        var springs = this.springs;

        each(toArray(keys), function (key) {
          return springs[key].stop();
        });
      }

      return this;
    }
    /** Freeze the active animation in time */
    ;

    _proto3.pause = function pause(keys) {
      if (is.und(keys)) {
        this.each(function (spring) {
          return spring.pause();
        });
      } else {
        var springs = this.springs;

        each(toArray(keys), function (key) {
          return springs[key].pause();
        });
      }

      return this;
    }
    /** Resume the animation if paused. */
    ;

    _proto3.resume = function resume(keys) {
      if (is.und(keys)) {
        this.each(function (spring) {
          return spring.resume();
        });
      } else {
        var springs = this.springs;

        each(toArray(keys), function (key) {
          return springs[key].resume();
        });
      }

      return this;
    }
    /** Restart every animation. */
    ;

    _proto3.reset = function reset() {
      this.each(function (spring) {
        return spring.reset();
      }); // TODO: restart async "to" prop

      return this;
    }
    /** Call a function once per spring value */
    ;

    _proto3.each = function each$1(iterator) {
      each(this.springs, iterator);
    }
    /** Destroy every spring in this controller */
    ;

    _proto3.dispose = function dispose() {
      this._state.asyncTo = undefined;
      this.each(function (spring) {
        return spring.dispose();
      });
      this.springs = {};
    }
    /** @internal Called at the end of every animation frame */
    ;

    _proto3._onFrame = function _onFrame() {
      var _this10 = this;

      var _this$_events = this._events,
          onStart = _this$_events.onStart,
          onChange = _this$_events.onChange,
          onRest = _this$_events.onRest;
      var isActive = this._active.size > 0;

      if (isActive && this._phase != ACTIVE) {
        this._phase = ACTIVE;
        flush(onStart, function (onStart) {
          return onStart(_this10);
        });
      }

      var values = (onChange.size || !isActive && onRest.size) && this.get();
      flush(onChange, function (onChange) {
        return onChange(values);
      }); // The "onRest" queue is only flushed when all springs are idle.

      if (!isActive) {
        this._phase = IDLE;
        flush(onRest, function (_ref8) {
          var onRest = _ref8[0],
              result = _ref8[1];
          result.value = values;
          onRest(result);
        });
      }
    }
    /** @internal */
    ;

    _proto3.onParentChange = function onParentChange(event) {
      if (event.type == 'change') {
        this._active[event.idle ? 'delete' : 'add'](event.parent);

        frameLoop.onFrame(this._onFrame);
      }
    };

    createClass(Controller, [{
      key: "idle",
      get: function get() {
        return !this._state.asyncTo && Object.values(this.springs).every(function (spring) {
          return spring.idle;
        });
      }
    }]);

    return Controller;
  }();
  /**
   * Warning: Props might be mutated.
   */


  function flushUpdateQueue(ctrl, queue) {
    return Promise.all(queue.map(function (props) {
      return flushUpdate(ctrl, props);
    })).then(function (results) {
      return getCombinedResult(ctrl, results);
    });
  }
  /**
   * Warning: Props might be mutated.
   *
   * Process a single set of props using the given controller.
   *
   * The returned promise resolves to `true` once the update is
   * applied and any animations it starts are finished without being
   * stopped or cancelled.
   */


  function flushUpdate(ctrl, props, isLoop) {
    var to = props.to,
        loop = props.loop,
        onRest = props.onRest; // Looping must be handled in this function, or else the values
    // would end up looping out-of-sync in many common cases.

    if (loop) {
      props.loop = false;
    }

    var asyncTo = is.arr(to) || is.fun(to) ? to : undefined;

    if (asyncTo) {
      props.to = undefined;
      props.onRest = undefined;
    } else {
      // For certain events, use batching to prevent multiple calls per frame.
      // However, batching is avoided when the `to` prop is async, because any
      // event props are used as default props instead.
      each(BATCHED_EVENTS, function (key) {
        var handler = props[key];

        if (is.fun(handler)) {
          var queue = ctrl['_events'][key];

          if (queue instanceof Set) {
            props[key] = function () {
              return queue.add(handler);
            };
          } else {
            props[key] = function (_ref9) {
              var finished = _ref9.finished,
                  cancelled = _ref9.cancelled;
              var result = queue.get(handler);

              if (result) {
                if (!finished) result.finished = false;
                if (cancelled) result.cancelled = true;
              } else {
                // The "value" is set before the "handler" is called.
                queue.set(handler, {
                  value: null,
                  finished: finished,
                  cancelled: cancelled
                });
              }
            };
          }
        }
      });
    }

    var keys = props.keys || Object.keys(ctrl.springs);
    var promises = keys.map(function (key) {
      return ctrl.springs[key].start(props);
    }); // Schedule the "asyncTo" if defined.

    var state = ctrl['_state'];

    if (asyncTo) {
      promises.push(scheduleProps(++ctrl['_lastAsyncId'], {
        props: props,
        state: state,
        actions: {
          pause: noop,
          resume: noop,
          start: function start(props, resolve) {
            props.onRest = onRest;

            if (!props.cancel) {
              resolve(runAsync(asyncTo, props, state, ctrl));
            } // Prevent `cancel: true` from ending the current `runAsync` call,
            // except when the default `cancel` prop is being set.
            else if (hasDefaultProp(props, 'cancel')) {
                cancelAsync(state, props.callId);
              }
          }
        }
      }));
    } // Respect the `cancel` prop when no keys are affected.
    else if (!props.keys && props.cancel === true) {
        cancelAsync(state, ctrl['_lastAsyncId']);
      }

    return Promise.all(promises).then(function (results) {
      var result = getCombinedResult(ctrl, results);

      if (loop && result.finished && !(isLoop && result.noop)) {
        var nextProps = createLoopUpdate(props, loop, to);

        if (nextProps) {
          prepareKeys(ctrl, [nextProps]);
          return flushUpdate(ctrl, nextProps, true);
        }
      }

      return result;
    });
  }
  /**
   * From an array of updates, get the map of `SpringValue` objects
   * by their keys. Springs are created when any update wants to
   * animate a new key.
   *
   * Springs created by `getSprings` are neither cached nor observed
   * until they're given to `setSprings`.
   */


  function getSprings(ctrl, props) {
    var springs = _extends({}, ctrl.springs);

    if (props) {
      each(toArray(props), function (props) {
        if (is.und(props.keys)) {
          props = createUpdate(props);
        }

        if (!is.obj(props.to)) {
          // Avoid passing array/function to each spring.
          props = _extends(_extends({}, props), {}, {
            to: undefined
          });
        }

        prepareSprings(springs, props, function (key) {
          return createSpring(key);
        });
      });
    }

    return springs;
  }
  /**
   * Tell a controller to manage the given `SpringValue` objects
   * whose key is not already in use.
   */


  function setSprings(ctrl, springs) {
    each(springs, function (spring, key) {
      if (!ctrl.springs[key]) {
        ctrl.springs[key] = spring;
        spring.addChild(ctrl);
      }
    });
  }

  function createSpring(key, observer) {
    var spring = new SpringValue();
    spring.key = key;

    if (observer) {
      spring.addChild(observer);
    }

    return spring;
  }
  /**
   * Ensure spring objects exist for each defined key.
   *
   * Using the `props`, the `Animated` node of each `SpringValue` may
   * be created or updated.
   */


  function prepareSprings(springs, props, create) {
    if (props.keys) {
      each(props.keys, function (key) {
        var spring = springs[key] || (springs[key] = create(key));
        spring['_prepareNode'](props);
      });
    }
  }
  /**
   * Ensure spring objects exist for each defined key, and attach the
   * `ctrl` to them for observation.
   *
   * The queue is expected to contain `createUpdate` results.
   */


  function prepareKeys(ctrl, queue) {
    each(queue, function (props) {
      prepareSprings(ctrl.springs, props, function (key) {
        return createSpring(key, ctrl);
      });
    });
  }
  /**
   * This context affects all new and existing `SpringValue` objects
   * created with the hook API or the renderprops API.
   */


  var ctx = React.createContext({});

  var SpringContext = function SpringContext(_ref) {
    var children = _ref.children,
        props = _objectWithoutPropertiesLoose$1(_ref, ["children"]);

    var inherited = React.useContext(ctx); // Memoize the context to avoid unwanted renders.

    props = useMemo(function () {
      return _extends(_extends({}, inherited), props);
    }, [inherited, props.pause, props.cancel, props.immediate, props.config]);
    var Provider = ctx.Provider;
    return /*#__PURE__*/React.createElement(Provider, {
      value: props
    }, children);
  };

  SpringContext.Provider = ctx.Provider;
  SpringContext.Consumer = ctx.Consumer;
  /** Get the current values of nearest `SpringContext` component. */

  var useSpringContext = function useSpringContext() {
    return React.useContext(ctx);
  };
  /** Create an imperative API for manipulating an array of `Controller` objects. */


  var SpringHandle = {
    create: function create(getControllers) {
      return {
        get controllers() {
          return getControllers();
        },

        update: function update(props) {
          each(getControllers(), function (ctrl, i) {
            ctrl.update(getProps(props, i, ctrl));
          });

          return this;
        },
        start: function start(props) {
          return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
            var results;
            return regenerator.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return Promise.all(getControllers().map(function (ctrl, i) {
                      var update = getProps(props, i, ctrl);
                      return ctrl.start(update);
                    }));

                  case 2:
                    results = _context2.sent;
                    return _context2.abrupt("return", {
                      value: results.map(function (result) {
                        return result.value;
                      }),
                      finished: results.every(function (result) {
                        return result.finished;
                      })
                    });

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }))();
        },
        stop: function stop(keys) {
          return each(getControllers(), function (ctrl) {
            return ctrl.stop(keys);
          });
        },
        pause: function pause(keys) {
          return each(getControllers(), function (ctrl) {
            return ctrl.pause(keys);
          });
        },
        resume: function resume(keys) {
          return each(getControllers(), function (ctrl) {
            return ctrl.resume(keys);
          });
        }
      };
    }
  };
  /** @internal */

  function useSprings(length, props, deps) {
    var propsFn = is.fun(props) && props;
    if (propsFn && !deps) deps = []; // Set to 0 to prevent sync flush.

    var layoutId = React.useRef(0);
    var forceUpdate = useForceUpdate(); // State is updated on commit.

    var _useState = React.useState(function () {
      return {
        ctrls: [],
        queue: [],
        flush: function flush(ctrl, updates) {
          var springs = getSprings(ctrl, updates); // Flushing is postponed until the component's commit phase
          // if a spring was created since the last commit.

          var canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs).some(function (key) {
            return !ctrl.springs[key];
          });
          return canFlushSync ? flushUpdateQueue(ctrl, updates) : new Promise(function (resolve) {
            setSprings(ctrl, springs);
            state.queue.push(function () {
              resolve(flushUpdateQueue(ctrl, updates));
            });
            forceUpdate();
          });
        }
      };
    }),
        state = _useState[0]; // The imperative API ref from the props of the first controller.


    var refProp = React.useRef();
    var ctrls = [].concat(state.ctrls);
    var updates = []; // Cache old controllers to dispose in the commit phase.

    var prevLength = usePrev(length) || 0;
    var disposed = ctrls.slice(length, prevLength); // Create new controllers when "length" increases, and destroy
    // the affected controllers when "length" decreases.

    useMemo(function () {
      ctrls.length = length;
      declareUpdates(prevLength, length);
    }, [length]); // Update existing controllers when "deps" are changed.

    useMemo(function () {
      declareUpdates(0, Math.min(prevLength, length));
    }, deps);
    /** Fill the `updates` array with declarative updates for the given index range. */

    function declareUpdates(startIndex, endIndex) {
      for (var i = startIndex; i < endIndex; i++) {
        var ctrl = ctrls[i] || (ctrls[i] = new Controller(null, state.flush));

        var _update2 = propsFn ? propsFn(i, ctrl) : props[i];

        if (_update2) {
          _update2 = updates[i] = declareUpdate(_update2);

          if (i == 0) {
            refProp.current = _update2.ref;
            _update2.ref = undefined;
          }
        }
      }
    }

    var api = React.useMemo(function () {
      return SpringHandle.create(function () {
        return state.ctrls;
      });
    }, []); // New springs are created during render so users can pass them to
    // their animated components, but new springs aren't cached until the
    // commit phase (see the `useLayoutEffect` callback below).

    var springs = ctrls.map(function (ctrl, i) {
      return getSprings(ctrl, updates[i]);
    });
    var context = useSpringContext();
    useLayoutEffect(function () {
      layoutId.current++; // Replace the cached controllers.

      state.ctrls = ctrls; // Update the ref prop.

      if (refProp.current) {
        refProp.current.current = api;
      } // Flush the commit queue.


      var queue = state.queue;

      if (queue.length) {
        state.queue = [];

        each(queue, function (cb) {
          return cb();
        });
      } // Dispose unused controllers.


      each(disposed, function (ctrl) {
        return ctrl.dispose();
      }); // Update existing controllers.


      each(ctrls, function (ctrl, i) {
        var values = springs[i];
        setSprings(ctrl, values); // Update the default props.

        ctrl.start({
          "default": context
        }); // Apply updates created during render.

        var update = updates[i];

        if (update) {
          // Start animating unless a ref exists.
          if (refProp.current) {
            ctrl.queue.push(update);
          } else {
            ctrl.start(update);
          }
        }
      });
    }); // Dispose all controllers on unmount.

    useOnce(function () {
      return function () {
        each(state.ctrls, function (ctrl) {
          return ctrl.dispose();
        });
      };
    }); // Return a deep copy of the `springs` array so the caller can
    // safely mutate it during render.

    var values = springs.map(function (x) {
      return _extends({}, x);
    });
    return propsFn || arguments.length == 3 ? [values, api.start, api.stop] : values;
  }
  /**
   * The props that `useSpring` recognizes.
   */

  /** @internal */


  function useSpring(props, deps) {
    var isFn = is.fun(props);

    var _useSprings = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps),
        _useSprings$ = _useSprings[0],
        values = _useSprings$[0],
        update = _useSprings[1],
        stop = _useSprings[2];

    return isFn || arguments.length == 2 ? [values, update, stop] : values;
  }

  function useTrail(length, propsArg, deps) {
    var propsFn = is.fun(propsArg) && propsArg;
    if (propsFn && !deps) deps = [];
    var ctrls = [];
    var result = useSprings(length, function (i, ctrl) {
      ctrls[i] = ctrl;
      return getProps(propsArg, i, ctrl);
    }, // Ensure the props function is called when no deps exist.
    // This works around the 3 argument rule.
    deps || [{}]);
    useLayoutEffect(function () {
      var reverse = is.obj(propsArg) && propsArg.reverse;

      for (var i = 0; i < ctrls.length; i++) {
        var parent = ctrls[i + (reverse ? 1 : -1)];
        if (parent) ctrls[i].update({
          to: parent.springs
        }).start();
      }
    }, deps);

    if (propsFn || arguments.length == 3) {
      var _update3 = result[1];
      result[1] = useCallbackOne(function (propsArg) {
        var reverse = is.obj(propsArg) && propsArg.reverse;
        return _update3(function (i, ctrl) {
          var props = getProps(propsArg, i, ctrl);
          var parent = ctrls[i + (reverse ? 1 : -1)];
          if (parent) props.to = parent.springs;
          return props;
        });
      }, deps);
      return result;
    }

    return result[0];
  } // TODO: convert to "const enum" once Babel supports it

  /** This transition is being mounted */


  var MOUNT = 'mount';
  /** This transition is entering or has entered */

  var ENTER = 'enter';
  /** This transition had its animations updated */

  var UPDATE = 'update';
  /** This transition will expire after animating */

  var LEAVE = 'leave';

  function useTransition(data, props, deps) {
    var ref = props.ref,
        reset = props.reset,
        sort = props.sort,
        _props$trail = props.trail,
        trail = _props$trail === void 0 ? 0 : _props$trail,
        _props$expires = props.expires,
        expires = _props$expires === void 0 ? true : _props$expires; // Every item has its own transition.

    var items = toArray(data);
    var transitions = []; // Keys help with reusing transitions between renders.
    // The `key` prop can be undefined (which means the items themselves are used
    // as keys), or a function (which maps each item to its key), or an array of
    // keys (which are assigned to each item by index).

    var keys = getKeys(items, props); // The "onRest" callbacks need a ref to the latest transitions.

    var usedTransitions = React.useRef(null);
    var prevTransitions = reset ? null : usedTransitions.current;
    useLayoutEffect(function () {
      usedTransitions.current = transitions;
    }); // Destroy all transitions on dismount.

    useOnce(function () {
      return function () {
        return each(usedTransitions.current, function (t) {
          if (t.expired) {
            clearTimeout(t.expirationId);
          }

          t.ctrl.dispose();
        });
      };
    }); // Map old indices to new indices.

    var reused = [];
    if (prevTransitions) each(prevTransitions, function (t, i) {
      // Expired transitions are not rendered.
      if (t.expired) {
        clearTimeout(t.expirationId);
      } else {
        i = reused[i] = keys.indexOf(t.key);
        if (~i) transitions[i] = t;
      }
    }); // Mount new items with fresh transitions.

    each(items, function (item, i) {
      transitions[i] || (transitions[i] = {
        key: keys[i],
        item: item,
        phase: MOUNT,
        ctrl: new Controller()
      });
    }); // Update the item of any transition whose key still exists,
    // and ensure leaving transitions are rendered until they finish.


    if (reused.length) {
      var i = -1;

      each(reused, function (keyIndex, prevIndex) {
        var t = prevTransitions[prevIndex];

        if (~keyIndex) {
          i = transitions.indexOf(t);
          transitions[i] = _extends(_extends({}, t), {}, {
            item: items[keyIndex]
          });
        } else if (props.leave) {
          transitions.splice(++i, 0, t);
        }
      });
    }

    if (is.fun(sort)) {
      transitions.sort(function (a, b) {
        return sort(a.item, b.item);
      });
    } // Track cumulative delay for the "trail" prop.


    var delay = -trail; // Expired transitions use this to dismount.

    var forceUpdate = useForceUpdate(); // These props are inherited by every phase change.

    var defaultProps = getDefaultProps(props); // Generate changes to apply in useEffect.

    var changes = new Map();

    each(transitions, function (t, i) {
      var key = t.key;
      var prevPhase = t.phase;
      var to;
      var phase;

      if (prevPhase == MOUNT) {
        to = props.enter;
        phase = ENTER;
      } else {
        var isLeave = keys.indexOf(key) < 0;

        if (prevPhase != LEAVE) {
          if (isLeave) {
            to = props.leave;
            phase = LEAVE;
          } else if (to = props.update) {
            phase = UPDATE;
          } else return;
        } else if (!isLeave) {
          to = props.enter;
          phase = ENTER;
        } else return;
      } // When "to" is a function, it can return (1) an array of "useSpring" props,
      // (2) an async function, or (3) an object with any "useSpring" props.


      to = callProp(to, t.item, i);
      to = is.obj(to) ? inferTo(to) : {
        to: to
      };

      if (!to.config) {
        var _config2 = props.config || defaultProps.config;

        to.config = callProp(_config2, t.item, i);
      } // The payload is used to update the spring props once the current render is committed.


      var payload = _extends(_extends({}, defaultProps), {}, {
        delay: delay += trail,
        // This prevents implied resets.
        reset: false
      }, to);

      if (phase == ENTER && is.und(payload.from)) {
        // The `initial` prop is used on the first render of our parent component,
        // as well as when `reset: true` is passed. It overrides the `from` prop
        // when defined, and it makes `enter` instant when null.
        var from = is.und(props.initial) || prevTransitions ? props.from : props.initial;
        payload.from = callProp(from, t.item, i);
      }

      var onRest = payload.onRest;

      payload.onRest = function (result) {
        var transitions = usedTransitions.current;
        var t = transitions.find(function (t) {
          return t.key === key;
        });
        if (!t) return;

        if (is.fun(onRest)) {
          onRest(result, t);
        } // Reset the phase of a cancelled enter/leave transition, so it can
        // retry the animation on the next render.


        if (result.cancelled && t.phase != UPDATE) {
          t.phase = prevPhase;
          return;
        }

        if (t.ctrl.idle) {
          var idle = transitions.every(function (t) {
            return t.ctrl.idle;
          });

          if (t.phase == LEAVE) {
            var expiry = callProp(expires, t.item);

            if (expiry !== false) {
              var expiryMs = expiry === true ? 0 : expiry;
              t.expired = true; // Force update once the expiration delay ends.

              if (!idle && expiryMs > 0) {
                // The maximum timeout is 2^31-1
                if (expiryMs <= 0x7fffffff) t.expirationId = setTimeout(forceUpdate, expiryMs);
                return;
              }
            }
          } // Force update once idle and expired items exist.


          if (idle && transitions.some(function (t) {
            return t.expired;
          })) {
            forceUpdate();
          }
        }
      };

      var springs = getSprings(t.ctrl, payload);
      changes.set(t, {
        phase: phase,
        springs: springs,
        payload: payload
      });
    }); // The prop overrides from an ancestor.


    var context = useSpringContext(); // Merge the context into each transition.

    useLayoutEffect(function () {
      each(transitions, function (t) {
        t.ctrl.start({
          "default": context
        });
      });
    }, [context]);
    var api = React.useMemo(function () {
      return SpringHandle.create(function () {
        return usedTransitions.current.map(function (t) {
          return t.ctrl;
        });
      });
    }, []);
    React.useImperativeHandle(ref, function () {
      return api;
    });
    useLayoutEffect(function () {
      each(changes, function (_ref10, t) {
        var phase = _ref10.phase,
            springs = _ref10.springs,
            payload = _ref10.payload;
        setSprings(t.ctrl, springs);

        if (!context.cancel) {
          t.phase = phase;

          if (phase == ENTER) {
            t.ctrl.start({
              "default": context
            });
          }

          t.ctrl[ref ? 'update' : 'start'](payload);
        }
      });
    }, reset ? void 0 : deps);

    var renderTransitions = function renderTransitions(render) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, transitions.map(function (t, i) {
        var _ref11 = changes.get(t) || t.ctrl,
            springs = _ref11.springs;

        var elem = render(_extends({}, springs), t.item, t, i);
        return elem && elem.type ? /*#__PURE__*/React.createElement(elem.type, _extends({}, elem.props, {
          key: is.str(t.key) || is.num(t.key) ? t.key : t.ctrl.id,
          ref: elem.ref
        })) : elem;
      }));
    };

    return arguments.length == 3 ? [renderTransitions, api.start, api.stop] : renderTransitions;
  }

  function getKeys(items, _ref12) {
    var key = _ref12.key,
        _ref12$keys = _ref12.keys,
        keys = _ref12$keys === void 0 ? key : _ref12$keys;
    return is.und(keys) ? items : is.fun(keys) ? items.map(keys) : toArray(keys);
  }
  /**
   * The `Spring` component passes `SpringValue` objects to your render prop.
   */


  function Spring(_ref) {
    var children = _ref.children,
        props = _objectWithoutPropertiesLoose$1(_ref, ["children"]);

    return children(useSpring(props));
  }

  function Trail(_ref) {
    var items = _ref.items,
        children = _ref.children,
        props = _objectWithoutPropertiesLoose$1(_ref, ["items", "children"]);

    var trails = useTrail(items.length, props);
    return items.map(function (item, index) {
      var result = children(item, index);
      return is.fun(result) ? result(trails[index]) : result;
    });
  }

  function Transition(_ref) {
    var items = _ref.items,
        children = _ref.children,
        props = _objectWithoutPropertiesLoose$1(_ref, ["items", "children"]);

    return /*#__PURE__*/React.createElement(React.Fragment, null, useTransition(items, props)(children));
  }
  /**
   * An `Interpolation` is a memoized value that's computed whenever one of its
   * `FluidValue` dependencies has its value changed.
   *
   * Other `FrameValue` objects can depend on this. For example, passing an
   * `Interpolation` as the `to` prop of a `useSpring` call will trigger an
   * animation toward the memoized value.
   */


  var Interpolation = /*#__PURE__*/function (_FrameValue2) {
    inheritsLoose$1(Interpolation, _FrameValue2);

    /** Useful for debugging. */

    /** Equals false when in the frameloop */

    /** The function that maps inputs values to output */
    function Interpolation(source, args) {
      var _this11;

      _this11 = _FrameValue2.call(this) || this;
      _this11.source = source;
      _this11.key = void 0;
      _this11.idle = true;
      _this11.calc = void 0;
      _this11.calc = createInterpolator.apply(void 0, args);

      var value = _this11._get();

      var nodeType = is.arr(value) ? AnimatedArray : AnimatedValue; // Assume the computed value never changes type.

      setAnimated(assertThisInitialized(_this11), nodeType.create(value));
      return _this11;
    }

    var _proto4 = Interpolation.prototype;

    _proto4.advance = function advance(_dt) {
      var value = this._get();

      var oldValue = this.get();

      if (!isEqual(value, oldValue)) {
        getAnimated(this).setValue(value);

        this._onChange(value, this.idle);
      }
    };

    _proto4._get = function _get() {
      var inputs = is.arr(this.source) ? this.source.map(function (node) {
        return node.get();
      }) : toArray(this.source.get());
      return this.calc.apply(this, inputs);
    };

    _proto4._reset = function _reset() {
      each(getPayload(this), function (node) {
        return node.reset();
      });

      _FrameValue2.prototype._reset.call(this);
    };

    _proto4._start = function _start() {
      this.idle = false;

      _FrameValue2.prototype._start.call(this);

      if (skipAnimation) {
        this.idle = true;
        this.advance();
      } else {
        frameLoop.start(this);
      }
    };

    _proto4._attach = function _attach() {
      var _this12 = this;

      // Start observing our "source" once we have an observer.
      var idle = true;
      var priority = 1;

      each(toArray(this.source), function (source) {
        if (isFrameValue(source)) {
          if (!source.idle) idle = false;
          priority = Math.max(priority, source.priority + 1);
        }

        source.addChild(_this12);
      });

      this.priority = priority;

      if (!idle) {
        this._reset();

        this._start();
      }
    };

    _proto4._detach = function _detach() {
      var _this13 = this;

      // Stop observing our "source" once we have no observers.
      each(toArray(this.source), function (source) {
        source.removeChild(_this13);
      }); // This removes us from the frameloop.


      this.idle = true;
    }
    /** @internal */
    ;

    _proto4.onParentChange = function onParentChange(event) {
      // Ensure our start value respects our parent values, in case
      // any of their animations were restarted with the "reset" prop.
      if (event.type == 'start') {
        this.advance();
      } // Change events are useful for (1) reacting to non-animated parents
      // and (2) reacting to the last change in a parent animation.
      else if (event.type == 'change') {
          // If we're idle, we know for sure that this change is *not*
          // caused by an animation.
          if (this.idle) {
            this.advance();
          } // Leave the frameloop when all parents are done animating.
          else if (event.idle) {
              this.idle = toArray(this.source).every(function (source) {
                return source.idle !== false;
              });

              if (this.idle) {
                this.advance();

                each(getPayload(this), function (node) {
                  node.done = true;
                });
              }
            }
        } // Ensure our priority is greater than all parents, which means
        // our value won't be updated until our parents have updated.
        else if (event.type == 'priority') {
            this.priority = toArray(this.source).reduce(function (max, source) {
              return Math.max(max, (source.priority || 0) + 1);
            }, 0);
          }

      _FrameValue2.prototype.onParentChange.call(this, event);
    };

    return Interpolation;
  }(FrameValue);
  /** Map the value of one or more dependencies */


  var to$1 = function to(source) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    return new Interpolation(source, args);
  };
  /** @deprecated Use the `to` export instead */


  var interpolate$1 = function interpolate(source) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return deprecateInterpolate(), new Interpolation(source, args);
  };
  /** Extract the raw value types that are being interpolated */


  assign({
    createStringInterpolator: createStringInterpolator$1,
    to: function to(source, args) {
      return new Interpolation(source, args);
    }
  });
  /** Advance all animations forward one frame */

  var update = function update() {
    return frameLoop.advance();
  };

  // http://www.w3.org/TR/css3-color/#svg-color
  var colors = {
    transparent: 0x00000000,
    aliceblue: 0xf0f8ffff,
    antiquewhite: 0xfaebd7ff,
    aqua: 0x00ffffff,
    aquamarine: 0x7fffd4ff,
    azure: 0xf0ffffff,
    beige: 0xf5f5dcff,
    bisque: 0xffe4c4ff,
    black: 0x000000ff,
    blanchedalmond: 0xffebcdff,
    blue: 0x0000ffff,
    blueviolet: 0x8a2be2ff,
    brown: 0xa52a2aff,
    burlywood: 0xdeb887ff,
    burntsienna: 0xea7e5dff,
    cadetblue: 0x5f9ea0ff,
    chartreuse: 0x7fff00ff,
    chocolate: 0xd2691eff,
    coral: 0xff7f50ff,
    cornflowerblue: 0x6495edff,
    cornsilk: 0xfff8dcff,
    crimson: 0xdc143cff,
    cyan: 0x00ffffff,
    darkblue: 0x00008bff,
    darkcyan: 0x008b8bff,
    darkgoldenrod: 0xb8860bff,
    darkgray: 0xa9a9a9ff,
    darkgreen: 0x006400ff,
    darkgrey: 0xa9a9a9ff,
    darkkhaki: 0xbdb76bff,
    darkmagenta: 0x8b008bff,
    darkolivegreen: 0x556b2fff,
    darkorange: 0xff8c00ff,
    darkorchid: 0x9932ccff,
    darkred: 0x8b0000ff,
    darksalmon: 0xe9967aff,
    darkseagreen: 0x8fbc8fff,
    darkslateblue: 0x483d8bff,
    darkslategray: 0x2f4f4fff,
    darkslategrey: 0x2f4f4fff,
    darkturquoise: 0x00ced1ff,
    darkviolet: 0x9400d3ff,
    deeppink: 0xff1493ff,
    deepskyblue: 0x00bfffff,
    dimgray: 0x696969ff,
    dimgrey: 0x696969ff,
    dodgerblue: 0x1e90ffff,
    firebrick: 0xb22222ff,
    floralwhite: 0xfffaf0ff,
    forestgreen: 0x228b22ff,
    fuchsia: 0xff00ffff,
    gainsboro: 0xdcdcdcff,
    ghostwhite: 0xf8f8ffff,
    gold: 0xffd700ff,
    goldenrod: 0xdaa520ff,
    gray: 0x808080ff,
    green: 0x008000ff,
    greenyellow: 0xadff2fff,
    grey: 0x808080ff,
    honeydew: 0xf0fff0ff,
    hotpink: 0xff69b4ff,
    indianred: 0xcd5c5cff,
    indigo: 0x4b0082ff,
    ivory: 0xfffff0ff,
    khaki: 0xf0e68cff,
    lavender: 0xe6e6faff,
    lavenderblush: 0xfff0f5ff,
    lawngreen: 0x7cfc00ff,
    lemonchiffon: 0xfffacdff,
    lightblue: 0xadd8e6ff,
    lightcoral: 0xf08080ff,
    lightcyan: 0xe0ffffff,
    lightgoldenrodyellow: 0xfafad2ff,
    lightgray: 0xd3d3d3ff,
    lightgreen: 0x90ee90ff,
    lightgrey: 0xd3d3d3ff,
    lightpink: 0xffb6c1ff,
    lightsalmon: 0xffa07aff,
    lightseagreen: 0x20b2aaff,
    lightskyblue: 0x87cefaff,
    lightslategray: 0x778899ff,
    lightslategrey: 0x778899ff,
    lightsteelblue: 0xb0c4deff,
    lightyellow: 0xffffe0ff,
    lime: 0x00ff00ff,
    limegreen: 0x32cd32ff,
    linen: 0xfaf0e6ff,
    magenta: 0xff00ffff,
    maroon: 0x800000ff,
    mediumaquamarine: 0x66cdaaff,
    mediumblue: 0x0000cdff,
    mediumorchid: 0xba55d3ff,
    mediumpurple: 0x9370dbff,
    mediumseagreen: 0x3cb371ff,
    mediumslateblue: 0x7b68eeff,
    mediumspringgreen: 0x00fa9aff,
    mediumturquoise: 0x48d1ccff,
    mediumvioletred: 0xc71585ff,
    midnightblue: 0x191970ff,
    mintcream: 0xf5fffaff,
    mistyrose: 0xffe4e1ff,
    moccasin: 0xffe4b5ff,
    navajowhite: 0xffdeadff,
    navy: 0x000080ff,
    oldlace: 0xfdf5e6ff,
    olive: 0x808000ff,
    olivedrab: 0x6b8e23ff,
    orange: 0xffa500ff,
    orangered: 0xff4500ff,
    orchid: 0xda70d6ff,
    palegoldenrod: 0xeee8aaff,
    palegreen: 0x98fb98ff,
    paleturquoise: 0xafeeeeff,
    palevioletred: 0xdb7093ff,
    papayawhip: 0xffefd5ff,
    peachpuff: 0xffdab9ff,
    peru: 0xcd853fff,
    pink: 0xffc0cbff,
    plum: 0xdda0ddff,
    powderblue: 0xb0e0e6ff,
    purple: 0x800080ff,
    rebeccapurple: 0x663399ff,
    red: 0xff0000ff,
    rosybrown: 0xbc8f8fff,
    royalblue: 0x4169e1ff,
    saddlebrown: 0x8b4513ff,
    salmon: 0xfa8072ff,
    sandybrown: 0xf4a460ff,
    seagreen: 0x2e8b57ff,
    seashell: 0xfff5eeff,
    sienna: 0xa0522dff,
    silver: 0xc0c0c0ff,
    skyblue: 0x87ceebff,
    slateblue: 0x6a5acdff,
    slategray: 0x708090ff,
    slategrey: 0x708090ff,
    snow: 0xfffafaff,
    springgreen: 0x00ff7fff,
    steelblue: 0x4682b4ff,
    tan: 0xd2b48cff,
    teal: 0x008080ff,
    thistle: 0xd8bfd8ff,
    tomato: 0xff6347ff,
    turquoise: 0x40e0d0ff,
    violet: 0xee82eeff,
    wheat: 0xf5deb3ff,
    white: 0xffffffff,
    whitesmoke: 0xf5f5f5ff,
    yellow: 0xffff00ff,
    yellowgreen: 0x9acd32ff
  };

  var isCustomPropRE = /^--/;

  function dangerousStyleValue(name, value) {
    if (value == null || typeof value === 'boolean' || value === '') return '';
    if (typeof value === 'number' && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

    return ('' + value).trim();
  }

  var attributeCache = {};

  function applyAnimatedValues(instance, props) {
    if (!instance.nodeType || !instance.setAttribute) {
      return false;
    }

    var isFilterElement = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';

    var _ref = props,
        style = _ref.style,
        children = _ref.children,
        scrollTop = _ref.scrollTop,
        scrollLeft = _ref.scrollLeft,
        attributes = _objectWithoutPropertiesLoose(_ref, ["style", "children", "scrollTop", "scrollLeft"]);

    var values = Object.values(attributes);
    var names = Object.keys(attributes).map(function (name) {
      return isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, // Attributes are written in dash case
      function (n) {
        return '-' + n.toLowerCase();
      }));
    });
    frameLoop.onWrite(function () {
      if (children !== void 0) {
        instance.textContent = children;
      } // Apply CSS styles


      for (var name in style) {
        if (style.hasOwnProperty(name)) {
          var value = dangerousStyleValue(name, style[name]);
          if (name === 'float') name = 'cssFloat';else if (isCustomPropRE.test(name)) {
            instance.style.setProperty(name, value);
          } else {
            instance.style[name] = value;
          }
        }
      } // Apply DOM attributes


      names.forEach(function (name, i) {
        instance.setAttribute(name, values[i]);
      });

      if (scrollTop !== void 0) {
        instance.scrollTop = scrollTop;
      }

      if (scrollLeft !== void 0) {
        instance.scrollLeft = scrollLeft;
      }
    });
  }

  var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };

  var prefixKey = function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  };

  var prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
  isUnitlessNumber = Object.keys(isUnitlessNumber).reduce(function (acc, prop) {
    prefixes.forEach(function (prefix) {
      return acc[prefixKey(prefix, prop)] = acc[prop];
    });
    return acc;
  }, isUnitlessNumber);
  /** The transform-functions
   * (https://developer.mozilla.org/fr/docs/Web/CSS/transform-function)
   * that you can pass as keys to your animated component style and that will be
   * animated. Perspective has been left out as it would conflict with the
   * non-transform perspective style.
   */

  var domTransforms = /^(matrix|translate|scale|rotate|skew)/; // These keys have "px" units by default

  var pxTransforms = /^(translate)/; // These keys have "deg" units by default

  var degTransforms = /^(rotate|skew)/;
  /** Add a unit to the value when the value is unit-less (eg: a number) */

  var addUnit = function addUnit(value, unit) {
    return is.num(value) && value !== 0 ? value + unit : value;
  };
  /**
   * Checks if the input value matches the identity value.
   *
   *     isValueIdentity(0, 0)              // => true
   *     isValueIdentity('0px', 0)          // => true
   *     isValueIdentity([0, '0px', 0], 0)  // => true
   */


  var isValueIdentity = function isValueIdentity(value, id) {
    return is.arr(value) ? value.every(function (v) {
      return isValueIdentity(v, id);
    }) : is.num(value) ? value === id : parseFloat(value) === id;
  };
  /**
   * This AnimatedStyle will simplify animated components transforms by
   * interpolating all transform function passed as keys in the style object
   * including shortcuts such as x, y and z for translateX/Y/Z
   */


  var AnimatedStyle = /*#__PURE__*/function (_AnimatedObject) {
    inheritsLoose(AnimatedStyle, _AnimatedObject);

    function AnimatedStyle(_ref) {
      var x = _ref.x,
          y = _ref.y,
          z = _ref.z,
          style = _objectWithoutPropertiesLoose(_ref, ["x", "y", "z"]);
      /**
       * An array of arrays that contains the values (static or fluid)
       * used by each transform function.
       */


      var inputs = [];
      /**
       * An array of functions that take a list of values (static or fluid)
       * and returns (1) a CSS transform string and (2) a boolean that's true
       * when the transform has no effect (eg: an identity transform).
       */

      var transforms = []; // Combine x/y/z into translate3d

      if (x || y || z) {
        inputs.push([x || 0, y || 0, z || 0]);
        transforms.push(function (xyz) {
          return ["translate3d(" + xyz.map(function (v) {
            return addUnit(v, 'px');
          }).join(',') + ")", // prettier-ignore
          isValueIdentity(xyz, 0)];
        });
      } // Pluck any other transform-related props


      each(style, function (value, key) {
        if (key === 'transform') {
          inputs.push([value || '']);
          transforms.push(function (transform) {
            return [transform, transform === ''];
          });
        } else if (domTransforms.test(key)) {
          delete style[key];
          if (is.und(value)) return;
          var unit = pxTransforms.test(key) ? 'px' : degTransforms.test(key) ? 'deg' : '';
          inputs.push(toArray(value));
          transforms.push(key === 'rotate3d' ? function (_ref2) {
            var x = _ref2[0],
                y = _ref2[1],
                z = _ref2[2],
                deg = _ref2[3];
            return ["rotate3d(" + x + "," + y + "," + z + "," + addUnit(deg, unit) + ")", isValueIdentity(deg, 0)];
          } : function (input) {
            return [key + "(" + input.map(function (v) {
              return addUnit(v, unit);
            }).join(',') + ")", isValueIdentity(input, key.startsWith('scale') ? 1 : 0)];
          });
        }
      });

      if (inputs.length) {
        style.transform = new FluidTransform(inputs, transforms);
      }

      return _AnimatedObject.call(this, style) || this;
    }

    return AnimatedStyle;
  }(AnimatedObject);
  /** @internal */


  var FluidTransform = /*#__PURE__*/function (_FluidValue) {
    inheritsLoose(FluidTransform, _FluidValue);

    function FluidTransform(inputs, transforms) {
      var _this;

      _this = _FluidValue.call(this) || this;
      _this.inputs = inputs;
      _this.transforms = transforms;
      _this._value = null;
      _this._children = new Set();
      return _this;
    }

    var _proto = FluidTransform.prototype;

    _proto.get = function get() {
      return this._value || (this._value = this._get());
    };

    _proto._get = function _get() {
      var _this2 = this;

      var transform = '';
      var identity = true;
      each(this.inputs, function (input, i) {
        var arg1 = getFluidValue(input[0]);

        var _this2$transforms$i = _this2.transforms[i](is.arr(arg1) ? arg1 : input.map(getFluidValue)),
            t = _this2$transforms$i[0],
            id = _this2$transforms$i[1];

        transform += ' ' + t;
        identity = identity && id;
      });
      return identity ? 'none' : transform;
    };

    _proto.addChild = function addChild(child) {
      var _this3 = this;

      if (!this._children.size) {
        // Start observing our inputs once we have an observer.
        each(this.inputs, function (input) {
          return each(input, function (value) {
            var config = getFluidConfig(value);
            if (config) config.addChild(_this3);
          });
        });
      }

      this._children.add(child);
    };

    _proto.removeChild = function removeChild(child) {
      var _this4 = this;

      this._children["delete"](child);

      if (!this._children.size) {
        // Stop observing our inputs once we have no observers.
        each(this.inputs, function (input) {
          return each(input, function (value) {
            var config = getFluidConfig(value);
            if (config) config.removeChild(_this4);
          });
        });
      }
    };

    _proto.onParentChange = function onParentChange(event) {
      if (event.type == 'change') {
        this._value = null;
      }

      each(this._children, function (child) {
        child.onParentChange(event);
      });
    };

    return FluidTransform;
  }(FluidValue);

  var primitives = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
  assign({
    colorNames: colors,
    createStringInterpolator: createStringInterpolator$1,
    batchedUpdates: reactDom.unstable_batchedUpdates
  });
  var host = createHost(primitives, {
    applyAnimatedValues: applyAnimatedValues,
    createAnimatedStyle: function createAnimatedStyle(style) {
      return new AnimatedStyle(style);
    },
    getComponentProps: function getComponentProps(_ref) {
      var props = _objectWithoutPropertiesLoose(_ref, ["scrollTop", "scrollLeft"]);

      return props;
    }
  });
  var animated = host.animated;

  exports.BailSignal = BailSignal;
  exports.Controller = Controller;
  exports.FrameLoop = FrameLoop;
  exports.FrameValue = FrameValue;
  exports.Globals = globals;
  exports.Interpolation = Interpolation;
  exports.Spring = Spring;
  exports.SpringContext = SpringContext;
  exports.SpringHandle = SpringHandle;
  exports.SpringValue = SpringValue;
  exports.Trail = Trail;
  exports.Transition = Transition;
  exports.a = animated;
  exports.animated = animated;
  exports.config = config;
  exports.createInterpolator = createInterpolator;
  exports.inferTo = inferTo;
  exports.interpolate = interpolate$1;
  exports.to = to$1;
  exports.update = update;
  exports.useChain = useChain;
  exports.useSpring = useSpring;
  exports.useSprings = useSprings;
  exports.useTrail = useTrail;
  exports.useTransition = useTransition;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
