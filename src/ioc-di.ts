// 控制反转与依赖注入
// 什么是控制反转
// 控制反转（Inversion of Control，IoC）是一种设计原则，用于减少类之间的耦合度。它将对象的创建和依赖关系的管理从类内部转移到外部容器或框架中。
// 控制反转的目的是：
// 1. 降低类之间的耦合度
// 2. 提高代码的可维护性和可扩展性
// 3. 实现松耦合的模块化设计

interface IMonitor {
  display(): void;
}

interface IHost {
  run(): void;
}

class Monitor27Inch implements IMonitor {
  display() {
    console.log('27寸显示器');
  }
}
class AppleHost implements IHost {
  run() {
    console.log('苹果主机');
  }
}

// class Computer {
//   public monitor: IMonitor;
//   public host: IHost;
//   constructor(monitor: IMonitor, host: IHost) {
//     this.monitor = monitor;
//     this.host = host;
//   }

//   start() {
//     // 启动
//     this.monitor.display();
//     this.host.run();
//   }
// }

// const computer = new Computer(new Monitor27Inch(), new AppleHost());
// computer.start(); // 控制正转 都写死了

class Computer {
  constructor(public monitor: IMonitor, public host: IHost) {}
  start() {
    this.monitor.display();
    this.host.run();
  }
}

const computer = new Computer(new Monitor27Inch(), new AppleHost());
computer.start(); // 如果有好多参数就会很麻烦了
// 定义一个容器 来管理对象的创建
class Container {
  private binds: Map<string, any> = new Map(); // 存储创建的实例
  private properties: Map<string, any> = new Map(); // 存储注入的属性
  bind<T>(key: string, creater: () => T) {
    if (!this.binds.has(key)) {
      this.binds.set(key, creater());
    }
  }
  get<T>(key: string): T {
    // 将记录的属性自动的注入到当前的实例上
    let instance = this.binds.get(key);
    let properties = this.properties.get(key);
    if (properties) {
      properties.forEach((property) => {
        instance[property] = this.get(property);
      });
    }

    return instance;
  }
}
const container = new Container();
container.bind('monitor', () => new Monitor27Inch());
container.bind('host', () => new AppleHost());
container.bind(
  'computer',
  () => new Computer(container.get('monitor'), container.get('host'))
);

computer.start();

// 注解的写法
interface IMonitor {
  display(): void;
}
interface IHost {
  run(): void;
}

// 提供到容器中，自动会创建实例在容器中
@Provide('Monitor')
class Montior27inch implements IMonitor {
  display() {
    console.log('27寸显示器');
  }
}
@Provide('Host')
class AppleHost implements IHost {
  run() {
    console.log('苹果主机');
  }
}

function Provide(key: string) {
  return (target: any) => {
    container.bind(key, () => new target());
  };
}

function Inject(key: string) {
  return (target: any, propertyKey: string) => {
    // 当前哪个原型上注入了哪些属性，做一个映射关系，稍后解析电脑的时候自动解释它所依赖的属性
    // container.bind(propertyKey, () => container.get(key));
    container.properties.set(
      `${target.prototype.constructor.name}.${propertyKey}`,
      key
    );
    // 关联就是哪个类，对应哪个属性，用哪个哪个标识找到实例来进行赋值
  };
}

// DI 依赖注入, 不需要在类中硬编码
@Provide('Computer')
class Computer {
  // 注入进来
  @Inject('Monitor')
  monitor: IMonitor;
  @Inject('Host')
  host: IHost;

  start() {
    this.monitor.display();
  }
}

export {};
