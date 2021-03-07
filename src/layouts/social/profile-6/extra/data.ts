import {ImageSourcePropType} from 'react-native';

export class Profile {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly photo: ImageSourcePropType,
    readonly location: string,
    readonly followers: number,
    readonly following: number,
    readonly posts: number,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static helenKuper(): Profile {
    return new Profile(
      'Helen',
      'Kuper',
      require('../assets/image-profile.jpg'),
      'Germany',
      1500,
      86,
      116,
    );
  }
}

export class Service {
  constructor(readonly photo: ImageSourcePropType, readonly category: string) {}

  static service1(): Service {
    return new Service(require('../assets/image-plant-1.jpg'), 'Plants');
  }

  static service2(): Service {
    return new Service(require('../assets/image-plant-2.jpg'), 'Plants');
  }

  static service3(): Service {
    return new Service(
      require('../assets/../assets/image-plant-3.jpg'),
      'Plants',
    );
  }

  static travel1(): Service {
    return new Service(require('../assets/image-travel-1.jpg'), 'Travel');
  }

  static travel2(): Service {
    return new Service(require('../assets/image-travel-2.jpg'), 'Travel');
  }

  static travel3(): Service {
    return new Service(require('../assets/image-travel-3.jpg'), 'Travel');
  }

  static style1(): Service {
    return new Service(require('../assets/image-style-1.jpg'), 'Style');
  }

  static style2(): Service {
    return new Service(require('../assets/image-style-2.jpg'), 'Style');
  }

  static style3(): Service {
    return new Service(require('../assets/image-style-3.jpg'), 'Style');
  }
}
