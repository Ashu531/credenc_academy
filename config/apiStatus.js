export default class ApiStatus {
    static NOT_STARTED =  'not started';
    static STARTED = 'started';
    static SUCCESS = 'success';
    static FAILED = 'failed';
    static PENDING =  'pending';
    static CANCELLED =  'cancelled';

    status = this.NOT_STARTED;

    constructor(){
        this.status = ApiStatus.NOT_STARTED;
    }

    start(){
        this.status = ApiStatus.STARTED;
    }

    makeApiCall(){
        this.status = ApiStatus.PENDING;
    }

    cancel(){
        this.status = ApiStatus.CANCELLED;
    }

    failed(){
        this.status = ApiStatus.FAILED;
    }

    success(){
        this.status = ApiStatus.SUCCESS;
    }

    hasStarted(){
        return this.status === ApiStatus.STARTED;
    }

    isPending(){
        return this.status === ApiStatus.PENDING;
    }

    hasFailed(){
        return this.status === ApiStatus.FAILED;
    }

    hasCompleted(){
        return this.status === ApiStatus.SUCCESS;
    }

    hasNotStarted(){
        return this.status === ApiStatus.NOT_STARTED;
    }

    isCancelled(){
        return this.status === ApiStatus.CANCELLED;
    }

    getStatus(){
        return this.status;
    }
}