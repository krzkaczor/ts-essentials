/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { AssertTrue as Assert, IsExact, AssertFalse } from "conditional-type-checks";

import {
  assert,
  Buildable,
  DeepNonNullable,
  DeepNullable,
  DeepOmit,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  DeepWritable,
  Dictionary,
  DictionaryValues,
  MarkOptional,
  MarkRequired,
  Merge,
  NonEmptyObject,
  NonNever,
  noop,
  PickProperties,
  ReadonlyKeys,
  SafeDictionary,
  Tuple,
  WritableKeys,
  XOR,
  Head,
  Tail,
  Exact,
  ElementOf,
  DeepUndefinable,
  OptionalKeys,
  RequiredKeys,
  Opaque,
  AsyncOrSyncType,
  AsyncOrSync,
  Awaited,
  Newable,
  NullishKeys,
  NonNullishKeys,
} from "../lib";

function testDictionary() {
  const dict: Dictionary<number> = null as any;
  type Test = Assert<IsExact<typeof dict["foo"], number>>;
}

function testDictionaryTwoArguments() {
  const dict: Dictionary<number, "a" | "b"> = null as any;
  type Test = Assert<IsExact<typeof dict["a"], number>>;
}

function testDictionaryValues() {
  type Test = Assert<IsExact<DictionaryValues<Dictionary<number>>, number>>;
}

function testDictionaryValuesTwoArguments() {
  type Test = Assert<IsExact<DictionaryValues<Dictionary<number, "a" | "b">>, number>>;
}

function testSafeDictionary() {
  const dict: SafeDictionary<number> = null as any;
  type Test = Assert<IsExact<typeof dict["foo"], number | undefined>>;
}

function testSafeDictionaryByNumber() {
  const dict: SafeDictionary<boolean, number> = null as any;
  type Test = Assert<IsExact<typeof dict[42], boolean | undefined>>;
}

function testSafeDictionaryValues() {
  type Test = Assert<IsExact<DictionaryValues<SafeDictionary<number>>, number | undefined>>;
}

function testSafeDictionaryFiniteTypeNonExhaustiveness() {
  type TestType = "A" | "B";
  const safeDict: SafeDictionary<string, TestType> = { A: "OK" };
}

type ComplexNestedPartial = {
  simple?: number;
  nested?: {
    date?: Date;
    func?: () => string;
    array?: { bar?: number }[];
    set?: Set<{ name?: string }>;
    tuple?: [string?, number?, { good?: boolean }?];

    map?: Map<
      string,
      {
        name?: string;
      }
    >;
    promise?: Promise<{ foo?: string; bar?: number }>;
  };
};

type ComplexNestedRequired = {
  simple: number;
  nested: {
    date: Date;
    func: () => string;
    array: { bar: number }[];
    tuple: [string, number, { good: boolean }];
    set: Set<{ name: string }>;
    map: Map<
      string,
      {
        name: string;
      }
    >;
    promise: Promise<{ foo: string; bar: number }>;
  };
};

type ComplexNestedNullable = {
  simple: number | null;
  nested: {
    date: Date | null;
    func: (() => string) | null;
    array: { bar: number | null }[];
    tuple: [string | null, number | null, { good: boolean | null } | null];
    set: Set<{ name: string | null }>;
    map: Map<string | null, { name: string | null }>;
    promise: Promise<{ foo: string | null; bar: number | null }>;
  };
};

type ComplexNestedUndefinable = {
  simple: number | undefined;
  nested: {
    date: Date | undefined;
    func: (() => string) | undefined;
    array: { bar: number | undefined }[];
    tuple: [string | undefined, number | undefined, { good: boolean | undefined } | undefined];
    set: Set<{ name: string | undefined }>;
    map: Map<string | undefined, { name: string | undefined }>;
    promise: Promise<{ foo: string | undefined; bar: number | undefined }>;
  };
};

type ComplexNestedNullableOrUndefined = {
  simple: number | null | undefined;
  nested: {
    date: Date | null | undefined;
    func: (() => string) | null | undefined;
    array: ({ bar: number | null | undefined } | null | undefined)[] | null | undefined;
    tuple:
      | [string | null | undefined, number | null | undefined, { good: boolean | null | undefined } | null | undefined]
      | null
      | undefined;
    set:
      | Set<
          | {
              name: string | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    map:
      | Map<
          string | null | undefined,
          | {
              name: string | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    promise:
      | Promise<
          | {
              foo: string | null | undefined;
              bar: number | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

type ComplexNestedReadonly = {
  readonly simple: number;
  readonly nested: {
    readonly date: Date;
    readonly func: () => string;
    readonly array: readonly { readonly bar: number }[];
    readonly tuple: readonly [string, number, { readonly good: boolean }];
    readonly set: ReadonlySet<{
      readonly name: string;
    }>;
    readonly map: ReadonlyMap<
      string,
      {
        readonly name: string;
      }
    >;
    readonly promise: Promise<{ readonly foo: string; readonly bar: number }>;
  };
};

function testDeepPartial() {
  type Test = Assert<IsExact<DeepPartial<ComplexNestedRequired>, ComplexNestedPartial>>;
}

function testDeepReadonly1() {
  type Test = Assert<IsExact<DeepReadonly<ComplexNestedRequired>, ComplexNestedReadonly>>;
}

interface IDeepReadonlyTestHelperType extends DeepReadonly<{ field: string[] }> {}

// Build-time test to ensure the fix for
// https://github.com/krzkaczor/ts-essentials/issues/17 remains in place.
function testDeepReadonly2() {
  const a: DeepReadonly<IDeepReadonlyTestHelperType> = {
    field: ["lala"],
  };

  let b: IDeepReadonlyTestHelperType = {
    field: ["lala"],
  };

  b = a;
}

function testNonNullable() {
  type Test = Assert<IsExact<NonNullable<"abc" | null | undefined>, "abc">>;
}

function testDeepNullable() {
  type Test = Assert<IsExact<DeepNullable<ComplexNestedRequired>, ComplexNestedNullable>>;
}

type SimpleType = {
  field1: string;
  field2: string;
  field3: {
    field4: string;
    field5: number;
    field6: {
      field7: number;
      field8: string;
    };
  };
};

type SimpleTypeNullable = {
  field1: string | null;
  field2: string | null;
  field3: {
    field4: string | null;
    field5: number | null;
    field6: {
      field7: number | null;
      field8: string | null;
    };
  };
};

type SimpleTypeUndefinable = {
  field1: string | undefined;
  field2: string | undefined;
  field3: {
    field4: string | undefined;
    field5: number | undefined;
    field6: {
      field7: number | undefined;
      field8: string | undefined;
    };
  };
};

function testDeepNullable2() {
  type Test = Assert<IsExact<DeepNullable<SimpleType>, SimpleTypeNullable>>;
}

function testDeepUndefinable() {
  type Test1 = AssertFalse<IsExact<DeepUndefinable<SimpleType>, DeepPartial<SimpleType>>>;
  type Test2 = Assert<IsExact<DeepUndefinable<SimpleType>, SimpleTypeUndefinable>>;
  type Test3 = Assert<IsExact<DeepUndefinable<ComplexNestedRequired>, ComplexNestedUndefinable>>;
}

function testDeepNonNullable() {
  type Test = Assert<IsExact<DeepNonNullable<ComplexNestedNullableOrUndefined>, ComplexNestedRequired>>;
}

function testDeepRequire() {
  type Test = Assert<IsExact<DeepRequired<ComplexNestedPartial>, ComplexNestedRequired>>;
}

function testPickProperties() {
  type Test1 = Assert<IsExact<PickProperties<{ a: string; b: number[] }, any[]>, { b: number[] }>>;
  type Test2 = Assert<IsExact<PickProperties<{ a: string; b: number }, any[]>, {}>>;
}

function testOptionalKeys() {
  type Input = {
    req: string;
    opt?: string;
    opt2?: string;
    undef: string | undefined;
    nullable: string | null;
  };

  type Expected = "opt" | "opt2";
  type Actual = OptionalKeys<Input>;

  type Test = Assert<IsExact<Expected, Actual>>;
}

function testRequiredKeys() {
  type Input = {
    req: string;
    opt?: string;
    opt2?: string;
    undef: string | undefined;
    nullable: string | null;
  };

  type Expected = "req" | "undef" | "nullable";
  type Actual = RequiredKeys<Input>;

  type Test = Assert<IsExact<Expected, Actual>>;
}

function testNullishKeys() {
  type Input = {
    req: string;
    opt?: string;
    undef: string | undefined;
    nullable: string | null;
    both?: string | null;
  };

  type ActualNullishKeys = NullishKeys<Input>;
  type TestNullishKeys = Assert<IsExact<"opt" | "undef" | "nullable" | "both", ActualNullishKeys>>;

  type ActualNonNullishKeys = NonNullishKeys<Input>;
  type TestNonNullishKeys = Assert<IsExact<"req", ActualNonNullishKeys>>;
}

function testDeepOmit() {
  type Nested = {
    a: { b: string; c: { d: string; e: boolean }; f: number };
    array: { a: string; b: boolean }[][];
    set: Set<{ a: string; b: boolean }>;
    map: Map<
      number,
      {
        a: string;
        b: boolean;
      }
    >;
  };
  type Omitted = {
    a: { c: { e: boolean }; f: number };
    array: { b: boolean }[][];
    set: Set<{ b: boolean }>;
    map: Map<number, { b: boolean }>;
  };

  type Filter = {
    a: { b: never; c: { d: never } };
    array: { a: never };
    set: { a: never };
    map: { a: never };
  };

  type Test = Assert<IsExact<DeepOmit<Nested, Filter>, Omitted>>;
}

function testDeepOmit2() {
  type OptionalProperty = {
    id: string;
    age: number;
    name?: string;
  };
  type Omitted = {
    id: string;
    name?: string;
  };

  type Result = DeepOmit<OptionalProperty, { age: never }>;
  type Test = Assert<IsExact<Result, Omitted>>;
}

function testTupleInference() {
  type Expected = [number, string];

  function returnTuple<T extends Tuple>(tuple: T) {
    return tuple;
  }

  const ret = returnTuple([1, "s"]);

  type Test = Assert<IsExact<typeof ret, Expected>>;
}

function testParametrizedTuple() {
  function acceptsCertainTuple<T extends Tuple<number | string>>(tuple: T) {
    return tuple;
  }

  acceptsCertainTuple([42, "foo"]);
}

function testNonNever() {
  type TypesMap = { foo: string; bar: number; xyz: undefined };

  type Mapped = {
    [K in keyof TypesMap]: TypesMap[K] extends undefined ? never : TypesMap[K];
  };

  type TestA = Assert<IsExact<keyof Mapped, "foo" | "bar" | "xyz">>;
  type TestB = Assert<IsExact<keyof NonNever<Mapped>, "foo" | "bar">>;
}

function testNonEmptyObject() {
  type ObjectWithKeys = { foo: string; bar: number; xyz: undefined };
  type EmptyObject = {};

  type TestA = Assert<IsExact<NonEmptyObject<ObjectWithKeys>, ObjectWithKeys>>;
  type TestB = Assert<IsExact<NonEmptyObject<EmptyObject>, never>>;
}

function testDeepWritable() {
  type Test = Assert<IsExact<DeepWritable<ComplexNestedReadonly>, ComplexNestedRequired>>;
}

function testDeepWritable2() {
  type Foo = { readonly foo: string; bar: { readonly x: number } }[];

  const test: DeepWritable<Foo> = [
    {
      foo: "a",
      bar: {
        x: 5,
      },
    },
  ];

  test[0].foo = "b";
  test[0].bar.x = 2;
}

// Test whether for totally writable types, apply DeepReadonly then DeepWritable will yield the original type
function testDeepWritableReverseIsDeepReadonlyForTotallyWritableType() {
  type TotallyWritableType = {
    a: number[][];
    nested: { a: 1 };
    numberArray: number[];
  }[];

  type Test_Indeed_Obj_Totally_Writable = Assert<IsExact<TotallyWritableType, DeepWritable<TotallyWritableType>>>;
  type Test = Assert<IsExact<DeepWritable<DeepReadonly<TotallyWritableType>>, TotallyWritableType>>;
}

function testBuildable() {
  type Test = Assert<IsExact<Buildable<ComplexNestedReadonly>, ComplexNestedPartial>>;
}

function testMarkRequired() {
  type TestType = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };
  type ExpectedType = {
    required1: number;
    required2: string;
    optional1: null;
    optional2?: boolean;
  };

  type Test = Assert<IsExact<MarkRequired<TestType, "required2" | "optional1">, ExpectedType>>;
}

function testMarkOptional() {
  type TestType = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };
  type ExpectedType = {
    required1?: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type Test = Assert<IsExact<MarkOptional<TestType, "required1">, ExpectedType>>;
}

function testMerge() {
  {
    type T = { a: number; b: string };

    type Merged = Merge<T, { a: string }>;

    type ExpectedMerged = { a: string; b: string };

    type Test = Assert<IsExact<Merged, ExpectedMerged>>;
  }
}

function testReadonlyKeys() {
  type T = { readonly a: number; b: string };

  type Actual = ReadonlyKeys<T>;

  type Expected = "a";

  type Test = Assert<IsExact<Actual, Expected>>;
}

function testWritableKeys() {
  type T = { readonly a: number; b: string };

  type Actual = WritableKeys<T>;

  type Expected = "b";

  type Test = Assert<IsExact<Actual, Expected>>;
}

function testAssert() {
  type TestType1 = string | undefined;
  type Expected = string;
  const anything = (undefined as any) as TestType1;

  assert(anything);
  type Actual = typeof anything;
  type Test = Assert<IsExact<Actual, string>>;
}

function testXOR() {
  type TestType1 = { a: string };
  type TestType2 = { a: number; b: boolean };
  type TestType3 = { c: number; d: boolean };

  type Actual1 = XOR<TestType1, TestType2>;
  type Expected1 = { a: string; b?: never } | { a: number; b: boolean };

  type Actual2 = XOR<TestType1, TestType3>;
  type Expected2 = { a: string; c?: never; d?: never } | { a?: never; c: number; d: boolean };

  type Test1 = Assert<IsExact<Actual1, Expected1>>;
  type Test2 = Assert<IsExact<Actual2, Expected2>>;
}

function testNoop() {
  const x: void = noop();
  const y: void = noop(false, 0, "", {}, [], null, undefined, Promise.resolve(), new Error(), noop);
  const z: Promise<void> = Promise.resolve("foo").then(noop);
  const callback: (_: number) => void = noop;
}

function testHeadTail() {
  type List1 = [number, string, boolean, "a" | "b"];

  type TestHead = Assert<IsExact<Head<List1>, number>>;
  type TestHeadOnEmpty = Assert<IsExact<Head<[]>, never>>;

  type TestTail = Assert<IsExact<Tail<List1>, [string, boolean, "a" | "b"]>>;
  type TestTailOnEmpty = Assert<IsExact<Tail<[]>, never>>;
  type TestTailOn1Elem = Assert<IsExact<Tail<[number]>, []>>;
}

function testExact() {
  type ABC = { a: number; b: number; c: number };
  type BC = { b: number; c: number };
  type C = { c: number };

  type a1 = Assert<IsExact<Exact<ABC, C>, never>>;
  type a2 = Assert<IsExact<Exact<BC, C>, never>>;
  type a3 = Assert<IsExact<Exact<C, C>, C>>;
}

function testElementOf() {
  const t1 = [1, 2, true, false];
  type a1 = Assert<IsExact<ElementOf<typeof t1>, number | boolean>>;
  const t2 = ["one"] as const;
  type a2 = Assert<IsExact<ElementOf<typeof t2>, "one">>;
}

function testOpaque() {
  type t1 = Assert<IsExact<Opaque<number, "a">, number & { __TYPE__: "a" }>>;
  type t2 = Assert<IsExact<Opaque<"a", string>, never>>; // should blow on mismatched order
}

function testAsyncOrSyncType() {
  type t1 = Assert<IsExact<AsyncOrSyncType<AsyncOrSync<number>>, number>>;
}

function testAwaitedType() {
  type t1 = Assert<IsExact<Awaited<Promise<number>>, number>>;
}

function testNewable() {
  class TestCls {
    constructor(arg1: string) {}
  }

  const t1: Newable<any> = TestCls;
}
