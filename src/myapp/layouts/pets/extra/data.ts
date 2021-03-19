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
      require('../../home/assets/image-profile.jpg'),
      '¿Cómo están tus mascotas hoy?',
      1500,
      86,
      116,
    );
  }
}

export class Service {
  constructor(
    readonly photo: ImageSourcePropType,
    readonly category: string,
    readonly screen: string,
  ) {}

  static service1(): Service {
    return new Service(
      require('../../home/assets/image-pet-1.jpg'),
      'Molly',
      'Molly',
    );
  }

  static service2(): Service {
    return new Service(
      require('../../home/assets/image-pet-2.jpg'),
      'Jaine',
      'Jaine',
    );
  }

  static service3(): Service {
    return new Service(
      require('../../home/assets/image-pet-3.jpg'),
      'Jaime',
      'Jaime',
    );
  }

  static travel1(): Service {
    return new Service(
      require('../../home/assets/image-pet-4.jpg'),
      'Vacuna',
      'AddVaccine',
    );
  }

  static travel2(): Service {
    return new Service(
      require('../../home/assets/image-pet-5.jpg'),
      'Desparacitación',
      'AddDeworming',
    );
  }

  static travel3(): Service {
    return new Service(
      require('../../home/assets/image-pet-6.jpg'),
      'Visita',
      'AddVisit',
    );
  }

  static style1(): Service {
    return new Service(
      require('../../home/assets/image-pet-7.jpg'),
      'Susa',
      'Susa',
    );
  }

  static style2(): Service {
    return new Service(
      require('../../home/assets/image-pet-8.jpg'),
      'Mia',
      'Mia',
    );
  }

  static style3(): Service {
    return new Service(
      require('../../home/assets/image-pet-1.jpg'),
      'Lia',
      'Lia',
    );
  }
}
