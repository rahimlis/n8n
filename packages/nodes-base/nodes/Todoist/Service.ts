import {
	CloseHandler,
	CreateHandler,
	DeleteHandler,
	GetAllHandler,
	GetHandler,
	MoveHandler,
	ReopenHandler,
	SyncHandler,
	UpdateHandler
} from './OperationHandler';
import {Context} from './GenericFunctions';

export class TodoistService implements Service {

	async execute(ctx: Context, operation: OperationType): Promise<TodoistResponse> {
		return this.handlers[operation].handleOperation(ctx, 0);
	}

	private handlers = {
		'create': new CreateHandler(),
		'close': new CloseHandler(),
		'delete': new DeleteHandler(),
		'get': new GetHandler(),
		'getAll': new GetAllHandler(),
		'reopen': new ReopenHandler(),
		'update': new UpdateHandler(),
		'move': new MoveHandler(),
		'sync': new SyncHandler(),
	};

}

export enum OperationType {
	create = 'create',
	close = 'close',
	delete = 'delete',
	get = 'get',
	getAll = 'getAll',
	reopen = 'reopen',
	update = 'update',
	move = 'move',
	sync = 'sync',
}

export interface Section {
	name: string;
	id: string;
}

export interface Service {
	execute(ctx: Context, operation: OperationType): Promise<TodoistResponse>;
}

export interface TodoistResponse {
	success: boolean;
	// tslint:disable-next-line:no-any
	data: any;
}
