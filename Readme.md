4.0 Classes
[Ts Playground](https://www.typescriptlang.org/play?#code/IYIwzgLgTsDGEAJYBthjAgqmAplA3gFAIlID2AdpFAK7xlQAUxprADlGRDvDgCYIAZgEsokAHLAAtjgQAuBNWEUA5gBoWrEhy49uA1BOk4FS1ZoQBKfAF8LoanERhgATwASwxhWNyzKyz9oZRV7cGgnIRpkZEkZRkD-QjtCFDQMAAVUVzwEHAAPbgo+DGw8IlZBaNjjBIqtEigcCBooCgQAAwASfAgAC2EwADoRMQg4nBsEHv7BocNx4xsOixsAbgsXDy8fGSCoEOsLViaWts73HBiyEh7dyYQhhABZVwR7hEHp3oHhqpiJgllqtkkA)


[typescript 공식문서](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

1. typescript에서는 private, public과 같이 객체 지향적으로 프로그래밍할 수 있도록 만들어준다
2. Abstract class를 만들 수 있다.
3. protected 상속은 할수 있는 private 기능을 갖춘것

4. readonly 속성을 적용하기
5. type 과 interface의 차이점: interface는 react.js에서오브젝트 모양을 알려주는 방법

6. 인터페이스는 js로 변경되지 않고, 사라진다 but 어떻게 class 에게 강제할 수 있나??
 extends 대신 implements를 사용한다.
- constructor를 따로 작성해주어야한다.
- private를 사용할 수 없다.
- 여러개의 interface를 상속할 수 있다.

```typescript
interface User {
    firstName: string,
    lastName: string,
    sayHi(name: string): string,
    fullName(): string,
}
class Player implements User {
    constructor(
        public firstName: string,
        public lastName: string) { }
    sayHi(name: string) {
        return `Hello ${name} My name is ${this.fullName}`
    }
    fullName() {
        return `${this.firstName}`
    }
}
```

7. 타입과 인터페이스의 차이점 추가
**클래스나 오브젝트의 모양을 정의할 때** 인터페이스 사용 -> 상속의 방법이 직관적이기 때문
```typescript
type PlayerA = {
    name: string
}
type PlayerAA = PlayerA & {
    lastName: string
}

const playerA: PlayerAA = {
    name: "nico",
    lastName: "last"
}

interface PlayerB {
    name: string
}

interface PlayerBB extends PlayerB {
    lastName: string
}

interface PlayerBB {
    health: number
}

const playerB: PlayerBB = {
    name: "NINI",
    lastName: "xxx",
    health: 10,
}
```

