Ext.define('Heartyoh.store.CodeStore', {
	extend : 'Ext.data.Store',

	autoLoad : true,

	fields : [ {
		name : 'key',
		type : 'string'
	}, {
		name : 'group',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'desc',
		type : 'string'
	}, {
		name : 'created_at',
		type : 'date',
		dateFormat:'time'
	}, {
		name : 'updated_at',
		type : 'date',
		dateFormat:'time'
	} ],
	
	proxy : {
		type : 'ajax',
		url : 'code',
		reader : {
			type : 'json'
		}
	},
	
	groupField: 'group',
    
	groupDir  : 'DESC',
	
	substore : function(group) {
		if(!this.substores)
			return null;
		return this.substores[group];
	},
	
	listeners : {
		load : function(store, records, success) {
			if(!success)
				return;
			store.substores = {};
			
			groups = store.getGroups();
			
			Ext.each(groups, function(group) {
				store.substores[group.name] = Ext.create('Ext.data.Store', {
					model : 'Heartyoh.model.Code',
					data : group.children
				})
			});
		}
	}
});