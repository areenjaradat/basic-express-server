'use strict';

const validator=require('../src/middleware/validator');

describe('validator',()=>{
 
  let req={name:'anyname'};
  let res={};
  let next=jest.fn();
 
  
  it('logs',()=>{
    validator(req,res,next);
    expect(next).toHaveBeenCalled();
  });
  
});
