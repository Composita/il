export enum OperatorCode {
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

    ClientSend,
    ClientReceive,
    ServerSend,
    ServerReceive,
    Connect,
    Disconnect,
    ClientReceiveTest,
    ServerReceiveTest,
    ClientInputTest,
    ServerInputTest,
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

    // concurrency
    Await,
    AcquireShared,
    ReleaseShared,
    AcquireExclusive,
    ReleaseExclusive,

    Branch,
    BranchTrue,
    BranchFalse,

    IsType,
    ExistsTest,
}
