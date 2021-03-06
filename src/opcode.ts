export enum OperationCode {
    // math binary
    Add,
    Subtract,
    Multiply,
    Divide,
    Negate,
    Modulo,

    // compare
    Equal,
    Less,
    LessEqual,
    Greater,
    GreaterEqual,
    NotEqual,

    // unary invert
    Not,

    // logic binary ops
    LogicOr,
    LogicAnd,

    // new component
    New,
    Delete,

    Send,
    Receive,
    Connect,
    Disconnect,
    ReceiveTest,
    InputTest,
    SystemCall,
    ProcedureCall,
    Return,

    // load constants
    LoadConstantBoolean,
    LoadConstantText,
    LoadConstantCharacter,
    LoadConstantFloat,
    LoadConstantInteger,

    // move components around
    Move,

    // variables
    StoreVariable,
    LoadVariable,
    LoadArrayVariable,
    LoadArrayVariableElement,
    LoadService,
    LoadThis,

    // concurrency
    AcquireShared,
    ReleaseShared,
    AcquireExclusive,
    ReleaseExclusive,

    Branch,
    BranchTrue,
    BranchFalse,

    IsType,
    ExistsTest,

    // foreach
    BeginForEach,
    EndForEach,
    AssignArrayIndex,
}
