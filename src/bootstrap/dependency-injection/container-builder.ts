import {Container} from 'inversify';
import '../../controllers/text-complexity-controller';

export class ContainerBuilder {
    public build(): Container {
        return new Container({autoBindInjectable: true});
    }
}