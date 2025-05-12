(module
  (type (;0;) (func))
  (type (;1;) (func (param i32)))
  (type (;2;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0)
    (local i32 i32 i32)
    i32.const 1040
    i32.load
    local.tee 0
    if  ;; label = @1
      i32.const 1044
      i32.load
      local.set 1
      loop  ;; label = @2
        i32.const 1044
        local.get 1
        i32.const 1
        i32.sub
        local.tee 2
        i32.store
        local.get 1
        i32.const 0
        i32.gt_s
        if (result i32)  ;; label = @3
          loop  ;; label = @4
            i32.const 1040
            i32.load
            local.get 2
            i32.const 2
            i32.shl
            i32.add
            local.tee 0
            i32.load offset=132
            local.get 0
            i32.load offset=4
            call_indirect (type 1)
            i32.const 1044
            i32.const 1044
            i32.load
            local.tee 0
            i32.const 1
            i32.sub
            local.tee 2
            i32.store
            local.get 0
            i32.const 0
            i32.gt_s
            br_if 0 (;@4;)
          end
          i32.const 1040
          i32.load
        else
          local.get 0
        end
        i32.load
        local.set 0
        i32.const 32
        local.set 1
        i32.const 1044
        i32.const 32
        i32.store
        i32.const 1040
        local.get 0
        i32.store
        local.get 0
        br_if 0 (;@2;)
      end
    end)
  (func (;1;) (type 2) (param i32 i32) (result i32)
    i32.const 5)
  (func (;2;) (type 0))
  (table (;0;) 1 1 funcref)
  (memory (;0;) 258 258)
  (export "a" (memory 0))
  (export "b" (func 2))
  (export "c" (func 1))
  (export "d" (func 0)))
