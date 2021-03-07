import {ImageSourcePropType} from 'react-native';

export class Profile {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly photo: ImageSourcePropType,
    readonly location: string,
    readonly description: string,
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
      require('../assets/image-profile-1.jpg'),
      'Germany',
      "I'm a Traveler. I'm like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.",
      1500,
      86,
      116,
    );
  }

  static jenAustin(): Profile {
    return new Profile(
      'Jen',
      'Austin',
      require('../assets/image-profile-2.jpg'),
      'Tokyo',
      "I'm a Traveler. I'm like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.",
      2500,
      172,
      25,
    );
  }

  static jenniferGreen(): Profile {
    return new Profile(
      'Jennifer',
      'Green',
      require('../assets/image-profile-3.jpg'),
      'Germany',
      'Hi! My name is Jennifer. I’m 25 and I live in Berlin. I’m interested in computer science, music, sport and fantasy literature.',
      2500,
      172,
      25,
    );
  }
}

export class Service {
  constructor(readonly photo: ImageSourcePropType, readonly category: string) {}

  static service1(): Service {
    return new Service(require('../assets/image-plant-1.jpg'), 'Plants');
  }

  static travel1(): Service {
    return new Service(require('../assets/image-travel-1.jpg'), 'Travel');
  }

  static style1(): Service {
    return new Service(require('../assets/image-style-1.jpg'), 'Style');
  }
}
