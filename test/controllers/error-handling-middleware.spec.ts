import {expect} from 'chai';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {ValidationError} from '../../src/controllers/validation/validation-error';
import {ErrorHandlingMiddleware} from '../../src/controllers/error-handling-middleware';
import httpMocks = require('node-mocks-http');

describe('Error Handling Middleware', function () {
    it('should return BadRequest with nested errors if validation error occurs', function () {
        const mockRequest = httpMocks.createRequest();
        const mockResponse = httpMocks.createResponse();

        const nestedErrors = [{rootCause: 'Root cause'}];
        const validationError = new ValidationError(nestedErrors as any[]);

        ErrorHandlingMiddleware.handleError(validationError, mockRequest, mockResponse, this.errorThrowingNextFunction);

        expect(mockResponse._isJSON()).to.be.true;
        expect(mockResponse._isEndCalled()).to.be.true;
        expect(mockResponse.statusCode).to.equal(BAD_REQUEST);
        expect(JSON.parse(mockResponse._getData())).to.deep.equal({errors: nestedErrors});
    });

    it('shouldReturnInternalServerErrorForUnknownErrors', function () {
        const mockRequest = httpMocks.createRequest();
        const mockResponse = httpMocks.createResponse();

        ErrorHandlingMiddleware.handleError(new Error(), mockRequest, mockResponse, this.errorThrowingNextFunction);

        expect(mockResponse._getData()).to.be.empty;
        expect(mockResponse._isEndCalled()).to.be.true;
        expect(mockResponse.statusCode).to.equal(INTERNAL_SERVER_ERROR);
    });
});