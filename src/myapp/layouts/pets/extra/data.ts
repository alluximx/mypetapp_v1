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
      'Hola',
      'Karen',
      require('../assets/image-profile.jpg'),
      '¿Cómo están tus mascotas hoy?',
      1500,
      86,
      116,
    );
  }
}

export class Post {
  constructor(readonly photo: ImageSourcePropType, readonly category: string) {}

  static plant1(): Post {
    return new Post(require('../assets/image-pet-1.jpg'), 'Molly');
  }

  static plant2(): Post {
    return new Post(require('../assets/image-pet-2.jpg'), 'Jaine');
  }

  static plant3(): Post {
    return new Post(require('../assets/../assets/image-pet-3.jpg'), 'Jaime');
  }

  static travel1(): Post {
    return new Post(require('../assets/image-pet-4.jpg'), 'Darla');
  }

  static travel2(): Post {
    return new Post(require('../assets/image-pet-5.jpg'), 'Lola');
  }

  static travel3(): Post {
    return new Post(require('../assets/image-pet-6.jpg'), 'Kelly');
  }

  static style1(): Post {
    return new Post(require('../assets/image-pet-7.jpg'), 'Susa');
  }

  static style2(): Post {
    return new Post(require('../assets/image-pet-8.jpg'), 'Mia');
  }

  static style3(): Post {
    return new Post(require('../assets/image-pet-1.jpg'), 'Lia');
  }
}
