/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { IsExactType as IsExact, AssertTrue as Assert } from "conditional-type-checks";
import { DeepReadonly, DeepRequired, Tuple, NonNever, Writable, DeepWritable, Merge } from "../lib";

function testDeepReadonly1() {
  type Input = {
    a: number[][];
    nested: {
      a: 1;
    };
    readonlyAlready: ReadonlyArray<number>;
    stringProperty: string;
    numberProperty: number;
    booleanProperty: boolean;
    unknownProperty: unknown;
    nullProperty: null;
    undefinedProperty: undefined;
  }[];

  type Expected = ReadonlyArray<{
    readonly a: ReadonlyArray<ReadonlyArray<number>>;
    readonly nested: {
      readonly a: 1;
    };
    readonly readonlyAlready: ReadonlyArray<number>;
    readonly stringProperty: string;
    readonly numberProperty: number;
    readonly booleanProperty: boolean;
    readonly unknownProperty: unknown;
    readonly nullProperty: null;
    readonly undefinedProperty: undefined;
  }>;

  type Test = Assert<IsExact<DeepReadonly<Input>, Expected>>;
}

interface IDeepReadonlyTestHelperType
  extends DeepReadonly<{
    field: string[];
  }> {}

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

function testDeepRequire() {
  type Input = {
    a?: number;
    nested?: {
      a?: 1;
    };
  }[];

  type Expected = {
    a: number;
    nested: {
      a: 1;
    };
  }[];

  type Test = Assert<IsExact<DeepRequired<Input>, Expected>>;
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
  type TypesMap = {
    foo: string;
    bar: number;
    xyz: undefined;
  };

  type Mapped = { [K in keyof TypesMap]: TypesMap[K] extends undefined ? never : TypesMap[K] };

  type TestA = Assert<IsExact<keyof Mapped, "foo" | "bar" | "xyz">>;
  type TestB = Assert<IsExact<keyof NonNever<Mapped>, "foo" | "bar">>;
}

function testDeepWritable() {
  type ReadonlyType = {
    readonly foo: string;
    bar: {
      readonly x: number;
    };
  };

  const test: DeepWritable<ReadonlyType> = {
    foo: "a",
    bar: {
      x: 5,
    },
  };

  test.foo = "b";
  test.bar.x = 2;
}

function testDeepWritable2() {
  type Foo = {
    readonly foo: string;
    bar: {
      readonly x: number;
    };
  }[];

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
    nested: {
      a: 1;
    };
    numberArray: number[];
  }[];

  type Test_Indeed_Obj_Totally_Writable = Assert<IsExact<TotallyWritableType, DeepWritable<TotallyWritableType>>>;
  type Test = Assert<IsExact<DeepWritable<DeepReadonly<TotallyWritableType>>, TotallyWritableType>>;
}

function testMerge() {
  
  {
    type T = {
      a: number,
      b: string
    };

    type Merged = Merge<T, { a: string }>;

    type ExpectedMerged = {
      a: string,
      b: string
    };

    type Test = Assert<IsExact<Merged, ExpectedMerged>>;
  }
}
