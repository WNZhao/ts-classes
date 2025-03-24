// nestjs 的依赖注入 @Controller('articles'/add)
// articles 是路由，add 是方法
import 'reflect-metadata';

// 定义装饰器工厂函数
function methodDecorator(method: string) {
  return function (path: string) {
    return function (target: any, propertyKey: string, descriptor: any) {
      Reflect.defineMetadata('method', method, descriptor.value);
      Reflect.defineMetadata('path', path, descriptor.value);
    };
  };
}

// 定义装饰器
export const Post = methodDecorator('post');
export const Get = methodDecorator('get');
export const Delete = methodDecorator('delete');

// 类装饰器
function Controller(path: string = '') {
  return (target: any) => {
    Reflect.defineMetadata('path', path, target); // 给类添加了一个元数据
  };
}

// 使用装饰器
@Controller('/articles')
class ArticlesController {
  @Post('/add')
  addArticle() {
    console.log('add article');
  }
  @Get('/detail')
  getArticle() {
    console.log('get article');
  }
  @Delete('/remove')
  removeArticle() {
    console.log('remove article');
  }
}
// 最终生成一个路由 /articles/add 和 /articles/detail 和 /articles/remove 然后触发对应的逻辑
const controller = new ArticlesController();
function createRoutes(instance: any) {
  const protops: any = Reflect.getPrototypeOf(instance) || {};
  const classPath = Reflect.getMetadata('path', protops.constructor);
  let keys = Reflect.ownKeys(protops!).filter((key) => key !== 'constructor');
  let routes: any[] = [];
  keys.forEach((key) => {
    const path = Reflect.getMetadata('path', protops[key]);
    const method = Reflect.getMetadata('method', protops[key]);
    console.log(path, method);
    routes.push({
      path: `${classPath}${path}`,
      method,
      handler: protops[key],
    });
  });
  return routes;
}
const routes = createRoutes(controller);

console.log(routes);

export {};
