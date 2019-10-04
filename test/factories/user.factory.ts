import * as faker from 'faker/locale/pt_BR';

import { User } from '../../src/users/user.entity';

class UserFactory {

  build(props?: any, howMany: number = 1): User | User[] {
    if (howMany > 1) {
      return Array(howMany).fill({}).map(() => this.create(props));
    }

    return this.create(props);
  }

  private create(props?: any): User {
    const user = new User();

    user.id = props && props.id;
    user.name = props && props.name || faker.name.findName();
    user.age = props && props.age || faker.random.number(80);
    user.isDeleted = props && props.isDeleted || faker.random.boolean();

    return user;
  }

}

export default new UserFactory();
