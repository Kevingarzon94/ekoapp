package com.tns.gen.java.lang;

public class Object_frnal_ts_helpers_l58_c38__AttachListener extends java.lang.Object implements com.tns.NativeScriptHashCodeProvider, android.view.View.OnAttachStateChangeListener {
	public Object_frnal_ts_helpers_l58_c38__AttachListener(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onViewAttachedToWindow(android.view.View param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onViewAttachedToWindow", void.class, args);
	}

	public void onViewDetachedFromWindow(android.view.View param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onViewDetachedFromWindow", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
