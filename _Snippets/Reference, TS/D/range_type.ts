interface CompileError<_ErrorMessageT> {
  readonly __compileError: never;
}

///////////////////////////////////////////////
type PopFront<TupleT extends any[]> = (
  ((...tuple: TupleT) => void) extends ((head: any, ...tail: infer TailT) => void) ?
  TailT :
  never
  );
type PushFront<TailT extends any[], FrontT> = (
  ((front: FrontT, ...tail: TailT) => void) extends ((...tuple: infer TupleT) => void) ?
  TupleT :
  never
  );
type LeftPadImpl<TupleT extends any[], ElementT extends any, LengthT extends number> = {
  0: TupleT,
  1: LeftPad<PushFront<TupleT, ElementT>, ElementT, LengthT>
}[
  TupleT['length'] extends LengthT ?
  0 :
  1
  ];
type LeftPad<TupleT extends any[], ElementT extends any, LengthT extends number> = (
  LeftPadImpl<TupleT, ElementT, LengthT> extends infer X ?
  (
    X extends any[] ?
    X :
    never
    ) :
  never
  );
type LongerTuple<A extends any[], B extends any[]> = (
  keyof A extends keyof B ?
  B :
  A
  );

///////////////////////////////////////////////////////
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/**
 * A non-empty tuple of digits
 */
type NaturalNumber = Digit[];

/**
 * 6 - 1 = 5
 */
type SubOne<D extends Digit> = {
  0: never,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
}[D];

type LtDigit<A extends Digit, B extends Digit> = {
  0: (
    B extends 0 ?
    false :
    true
    ),
  1: false,
  2: LtDigit<SubOne<A>, SubOne<B>>
}[
  A extends 0 ?
  0 :
  B extends 0 ?
  1 :
  2
  ];


//false
type ltDigit_0 = LtDigit<3, 3>;
//true
type ltDigit_1 = LtDigit<3, 4>;
//false
type ltDigit_2 = LtDigit<5, 2>;


/**
 * + Assumes `A` and `B` have the same length.
 * + Assumes `A` and `B` **ARE NOT** reversed.
 *   So, `A[0]` is actually the **FIRST** digit of the number.
 */
type LtEqNaturalNumberImpl<A extends NaturalNumber,
  B extends NaturalNumber> = {
  0: true,
  1: (
    LtDigit<A[0], B[0]> extends true ?
    true :
    A[0] extends B[0] ?
    LtEqNaturalNumberImpl<PopFront<A>,
      PopFront<B>> :
    false
    ),
  2: never
}[
  A['length'] extends 0 ?
  0 :
  number extends A['length'] ?
  2 :
  1
  ];
type LtEqNaturalNumber<A extends NaturalNumber,
  B extends NaturalNumber> = (
  LtEqNaturalNumberImpl<LeftPad<A, 0, LongerTuple<A, B>['length']>,
    LeftPad<B, 0, LongerTuple<A, B>['length']>> extends infer X ?
  (
    X extends boolean ?
    X :
    never
    ) :
  never
  );

//false
type ltEqNaturalNumber_0 = LtEqNaturalNumber<[1],
  [0]>;
//true
type ltEqNaturalNumber_1 = LtEqNaturalNumber<[5, 2, 3],
  [4, 8, 9, 2, 3]>;
//false
type ltEqNaturalNumber_2 = LtEqNaturalNumber<[4, 8, 9, 2, 3],
  [5, 2, 3]>;
//true
type ltEqNaturalNumber_3 = LtEqNaturalNumber<[5, 2, 3],
  [5, 2, 3]>;
//true
type ltEqNaturalNumber_4 = LtEqNaturalNumber<[5, 2, 2],
  [5, 2, 3]>;
//false
type ltEqNaturalNumber_5 = LtEqNaturalNumber<[5, 1],
  [2, 5]>;
//false
type ltEqNaturalNumber_6 = LtEqNaturalNumber<[2, 5, 7],
  [2, 5, 6]>;

type RangeLt<N extends NaturalNumber> = (
  number &
  {
    readonly __rangeLt: N | undefined;
  }
  );

type StringLengthLt<N extends NaturalNumber> = (
  string & { length: RangeLt<N> }
  );

type AssertStringLengthLt<S extends StringLengthLt<NaturalNumber>, N extends NaturalNumber> = (
  LtEqNaturalNumber<Exclude<S['length']['__rangeLt'], undefined>,
    N> extends true ?
  S :
  CompileError<[
    'Expected string of length less than',
    N,
    'received',
    Exclude<S['length']['__rangeLt'], undefined>
    ]>
  );
/**
 * String of length less than 256
 */
type StringLt256 = string & { length: RangeLt<[2, 5, 6]> };
/**
 * String of length less than 512
 */
type StringLt512 = string & { length: RangeLt<[5, 1, 2]> };
type String100 = string & { length: RangeLt<[1, 0, 0]> };

declare function foo<S extends StringLengthLt<NaturalNumber>>(
  s: AssertStringLengthLt<S, [2, 5, 6]>
): void;

declare const str256: StringLt256
declare const str512: StringLt512

foo(str256) //OK!
// foo(str512) //Error

declare function makeLengthRangeLtGuard<N extends NaturalNumber>(...n: N): (
  (x: string) => x is StringLengthLt<N>
  );

if (makeLengthRangeLtGuard(2, 5, 6)(str512)) {
  foo(str512) //OK!
}

declare const blah: string
// foo(blah) //Error

if (makeLengthRangeLtGuard(2, 5, 5)(blah)) {
  foo(blah) //OK!
}

if (makeLengthRangeLtGuard(2, 5, 6)(blah)) {
  foo(blah) //OK!
}

if (makeLengthRangeLtGuard(2, 5, 7)(blah)) {
  // foo(blah) //Error
}

type lessThanHundred = RangeLt<[1, 0, 0]>

export default {}
