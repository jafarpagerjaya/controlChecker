(function ( $ ) {
	$.fn.controlChecker = function( options ) {
		// init default options
		var settings = $.extend(true, {
			cssFramework: 'boostrap',
			modal: {
				enabled: true,
				id: 'myModal'
			},
			formId: null,
			changes: {
				class: 'has-changes',
				showText: false,
				text: 'Berganti'
			},
			success: {
				class: 'has-success',
				showText: true,
				text: 'Tersedia'
			},
			warning: {
				class: 'has-warning',
				showText: true,
				text: 'Sudah Terpakai'
			},
			empty: {
				class: 'has-empty',
				showText: true,
				text: 'Tidak Boleh Kosong'
			},
			error: {
				class: 'has-error',
				showText: true,
				text: 'Masih Kurang',
				secondText: 'Karekter'
			},
			match: {
				class: 'has-unmatch',
				showText: true,
				unmatchText: 'Belum Sama',
				matchText: '',
				matchThisId: null,
				matchToId: null
			},
			unsuit: {
				class: 'has-unsuit',
				showText: true,
				text: 'Formatnya Belum Sesuai'
			},
			parentClass: 'form-group',
			icon: {
				enabled: true,
				postion: 'before',
				success: 'fa fa-check',
				warning: 'fa fa-bell-o',
				empty: 'fa fa-info',
				error: 'fa fa-info-circle',
				unmatch: 'fa fa-exclamation-circle',
				unsuit: 'fa fa-exclamation'
			},
			ajax: {
				url: null,
				type: 'get',
				dataType: 'json',
				errorText: 'Gagal Melakukan Ajax'
			},
			prevChained: false
		}, options);

		// private functions
		function formGroupControl($this) {
			var $this = $(this),
				thisParent,
				parentSiblings,
				grandParent,
				grandParentClass,
				grandParentId;

			if ($this.not('[readonly]')) {
				$this.prop("required",true);
			}

			if ($this.parent('div').is(':not(.'+settings.parentClass)) {
				$this.add($this.prev('label')).wrapAll('<div></div>');
				thisParent = $this.parent('div');
				thisParent.addClass(settings.parentClass);
				if (thisParent.hasClass(settings.parentClass)) {
					parentSiblings = thisParent.siblings().length;
					if (parentSiblings === 0) {
						grandParent = thisParent.parent('div');
						grandParentId = grandParent.attr("id");
						grandParentClass = grandParent.attr("class");
						thisParent.attr("id", grandParentId).addClass(grandParentClass);
						thisParent.unwrap();
					}
				}
			}
			
			$(':reset').on("click", function() {
				$this.parent('.'+settings.parentClass).removeClass(settings.warning.class+' '+settings.success.class+' '+settings.changes.class+' '+settings.empty.class+' '+settings.error.class);
				$this.parent('.'+settings.parentClass).children('label').find('i, span:last-of-type').remove();
				$(this).parents('form').find(':submit').attr('disabled','disabled');
			});
		}

		function fromModalControl($this) {
			var thisModal = $(this);
				thisModal.find('div').removeClass(settings.match.class+' '+settings.unsuit.class+' '+settings.warning.class+' '+settings.success.class+' '+settings.changes.class+' '+settings.empty.class+' '+settings.error.class);

					if (settings.formId != null) {
						thisInput = thisModal.find('input[type!="hidden"],textarea,select').filter('[type!="reset"]').filter('[type!="submit"]').filter('[type!="button"]').filter('[type!="checkbox"]').filter('[type!="radio"]').filter('[type!="file"]');

						thisInput.each(function() {
							var $this = $(this);
								formGroupControl.call($this);
						});
					}
				
				thisModal.find('label > i, label > span:last-of-type').remove();
				thisModal.find(':submit').attr('disabled','disabled');
		}

		function toCapitalizeCase($string) {
			return $string.toLowerCase().replace(/(?:_)/g, ' ').replace(/(?:' '|\b)(\w)/g, function(str, p1) { return p1.toUpperCase()}).replace(/[ ]{2,}/, ' ').replace(/[^\w\d\s,.-]/g, function(str, p2) { return p2 = ' '});
		}

		function isUpperCase($string) {
			return $string.toUpperCase() === $string;
		}

		// init parent class
		if (settings.cssFramework == 'sui') {
			settings.parentClass = 'field';
		}

		// init form control
		var thisFrom = $("#"+settings.formId);
			if (settings.formId == null) {
				thisFrom = $("form");	
			}
		
			thisFrom.attr("autocomplete","off");
			thisFrom.find(':submit').attr('disabled','disabled');
			thisInput = thisFrom.find('input[type!="hidden"],textarea,select').filter('[type!="reset"]').filter('[type!="submit"]').filter('[type!="button"]').filter('[type!="checkbox"]').filter('[type!="radio"]').filter('[type!="file"]');

			thisInput.each(function() {
				var $this = $(this);
					formGroupControl.call($this);
			});

		// init icon control
		if (settings.icon.enabled == true) {
			var thisIcon = "<i />",
				iconSuccess = settings.icon.success,
				iconWarning = settings.icon.warning,
				iconEmpty = settings.icon.empty,
				iconError = settings.icon.error,
				iconUnmatch = settings.icon.unmatch;
				iconUnsuit = settings.icon.unsuit;

			function iconControl($this) {
				var $this = $(this);
					$this.children('i').remove();
					if (settings.icon.position === 'after') {
						$this.append(' '+thisIcon);
					} else {
						$this.prepend(thisIcon+' ');
					}
				return $this;
			}
		}

		// init modal control
		if (settings.modal.enabled == true) {
			switch(settings.cssFramework) {
				case 'sui':
					$("#"+settings.modal.id+"").modal({
						onShow: function() {
							var thisModal = $(this);
								fromModalControl.call(thisModal);
							}
					});
				break;
				default: 
					$("#"+settings.modal.id+"").on("show.bs.modal", function() {
						var thisModal = $(this);
							fromModalControl.call(thisModal);
					});
				break;
			}
		}

		var warning,
			success,
			changes,
			danger;
		return this.each(function() {
			var selfIdValue,
				storedValue,
				storedPreVal,
				storedPreName,
				storedLabel;

			$(this).addClass('form-control');

			$(this).one('focusin', function() {
				var self = $(this);
				if (self.siblings().is('label')) {
					storedLabel = true;
				}
			});

			$(this).on("focusin", function() {
				var self = $(this);
					
				self.parents('form').find(':submit').attr('disabled','disabled');

				if (settings.modal.enabled != true) {
					formGroupControl.call(self);
				}

				if (selfIdValue !== self.parents('form').attr('id')) {
					selfIdValue = self.parents('form').attr('id');
					storedValue = self.val();
					if (settings.prevChained == true) {
						var prevchain = self.parents('.'+settings.parentClass).prev('.'+settings.parentClass);
						storedPreVal = prevchain.find('select').val();
						storedPreName = prevchain.find('select').attr("name");
					}
				}
			});

			$(this).on("change", function() {
				var self = $(this),
					selfVal,
					selfMinLength = parseInt(self.attr('minlength')),
					selfType = self.data('type'),
					selfTable = self.data('table'),
					selfParent = self.parent('.'+settings.parentClass),
					selfLabel = selfParent.children('label');

				self.val(jQuery.trim(self.val()));        
				self.val(self.val().replace(/[ ]{2,}/, ' '));

				if (selfType === undefined) {
					switch(self.attr("type")) {
						case 'email':
						selfType = 'email';
						break;
						case 'password':
						selfType = 'password';
						break;
						default:
						selfType = self.attr("name");
						break;
					}
				}

				if (selfLabel.is('label') == false) {
					selfParent.prepend('<label />');
					selfParent.children('label').text(toCapitalizeCase(selfType));
					selfLabel = selfParent.children('label');
				}

				if (selfType !== undefined) {
					var selfSpanLength = selfLabel.find('span[data-type="' + selfType + '"]').length;
					if (selfSpanLength < 1) {
						selfLabel.append('<span />');
						selfLabel.children('span').last().attr("data-type", selfType);
					}
				}

				if (isUpperCase(self.val())) {
					self.val(self.val().toUpperCase());
				}

				selfLabel = iconControl.call(selfLabel);

				selfLabel.show();
				self.next('span.glyphicon').removeAttr('style');

				if (self.val().length === 0) {
					console.log('Data Kosong');
					selfParent.removeClass(settings.unsuit.class+' '+settings.match.class+' '+settings.changes.class+' '+settings.error.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.empty.class);
					selfLabel.children('i').attr("class", iconEmpty);
					if (settings.empty.showText == true) {
						selfLabel.children('span:last-of-type').text(' '+settings.empty.text);
					}
					return false;
				}

				if (self.val().length < selfMinLength) {
					var selfLeftLength = selfMinLength - self.val().length;
					console.log('Data kurang dari minimun panjang karater');
					selfParent.removeClass(settings.unsuit.class+' '+settings.match.class+' '+settings.changes.class+' '+settings.empty.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.error.class);
					selfLabel.children('i').attr("class", iconError);
					if (settings.error.showText == true) {
						selfLabel.children('span:last-of-type').text(' '+settings.error.text+' '+selfLeftLength+' '+settings.error.secondText);
					}
					return false;
				}

				if (selfType.includes('email')) {
					self.val(self.val().toLowerCase().replace(/[^a-zA-Z0-9@._-]/g, ''));
					var emailPatt = /^([^\.\_\-\@])+([^\.\@\_\-])*((([^\d\@]){0,1})[a-z0-9]{2,}){0,1}(@([a-zA-Z]{2,})+(\.([a-z]{2,})){1,2})$/;
					if (!self.val().match(emailPatt)) {
						selfParent.removeClass(settings.empty.class+' '+settings.match.class+' '+settings.changes.class+' '+settings.error.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.unsuit.class);
						selfLabel.children('i').attr("class", iconUnsuit);
						if (settings.unsuit.showText == true) {
							selfLabel.children('span:last-of-type').text(' '+settings.unsuit.text);
						}
						return false;
					}
				}

				var matchTo,
					matchParent,
					matchLabel;
				switch(self.attr('id')) {
					case settings.match.matchThisId: // macthing field
						console.log(settings.match.matchThisId);
						matchTo = $('#'+settings.match.matchToId);
						if (storedLabel != true) {
							selfLabel.hide();
							self.next('span.glyphicon').css('top','0');
						}
						if (matchTo.val().length < 1) {
							selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class);
							selfLabel.children('span:last-of-type').text('');
							self.next('span.glyphicon').css('top','0');
							return false;
						}						
						if (self.val() !== matchTo.val()) {
							if (settings.match.showText == true) {
								selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class).addClass(settings.match.class);
								selfLabel.show();
								selfLabel.children('i').attr("class", iconUnmatch);
								selfLabel.children('span:last-of-type').text(' '+settings.match.unmatchText);
								self.next('span.glyphicon').removeAttr('style');
							}
							return false;
						}
						selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.match.class).addClass(settings.changes.class);
						selfLabel.children('span:last-of-type').text(' '+settings.match.matchText);
						selfLabel.children('i').removeClass(iconUnmatch);
						return false;
					break;
					case settings.match.matchToId: // matching reference field
						console.log(settings.match.matchToId+ ' '+1);
						matchTo = $('#'+settings.match.matchThisId);
						matchParent = matchTo.parents('.'+settings.parentClass),
						matchLabel = matchParent.find('label');
						if (storedLabel != true) {
							matchLabel.hide();
							selfLabel.hide();
							matchTo.next('span.glyphicon').css('top','0');
							self.next('span.glyphicon').css('top','0');
						}
						if (matchTo.val().length < 1) {
							selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class);
							selfLabel.children('span:last-of-type').text('');
							return false;
						}
						selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.match.class);
						selfLabel.children('span:last-of-type').text('');
						if (self.val() !== matchTo.val()) {
							if (settings.match.showText == true) {
								matchParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class).addClass(settings.match.class);
								matchLabel.show();
								matchLabel.children('i').attr("class", iconUnmatch);
								matchLabel.children('span:last-of-type').text(' '+settings.match.unmatchText);
								matchTo.next('span.glyphicon').removeAttr('style');
							}
							return false;
						}
						matchParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.match.class).addClass(settings.changes.class);
						matchLabel.children('span:last-of-type').text(' '+settings.match.matchText);
						matchLabel.children('i').removeClass(iconUnmatch);
						return false;
					break;
					default:
					break;
				}

				if (storedValue === self.val()) {
					console.log('Data sama dengan yang ada di storedValue');
					selfParent.removeClass(settings.unsuit.class+' '+settings.changes.class+' '+settings.success.class+' '+settings.warning.class+' '+settings.empty.class+' '+settings.error.class);
					selfLabel.children('span:last-of-type').remove();
					return false;
				}

				if (selfTable === undefined) {
					console.log('Data Berubah');
					selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.changes.class);
					if (settings.changes.showText == true) {
						selfLabel.children('span:last-of-type').text(' '+settings.changes.text);
					} else {
						selfLabel.children('span:last-of-type').remove();
					}	
					return false;				
				}

				if (selfTable !== undefined) {

					selfVal = self.val();
					selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.success.class+' '+settings.changes.class+' '+settings.warning.class);

					$.ajax({
						url: settings.ajax.url,
						type: settings.ajax.type,
						dataType: settings.ajax.dataType,
						data: {
							columnName: selfType,
							table: selfTable,
							value: selfVal,
							prevColumnName: storedPreName,
							prevColumnValue: storedPreVal
						},
						success: function(data) {
							if (data.exists !== undefined) {
								if (data.exists === true) {
									selfParent.addClass(settings.warning.class);
									selfLabel.children('i').attr("class", iconWarning);
									if (settings.error.showText == true) {
										selfLabel.children('span:last-of-type').text(' '+settings.warning.text);
									}
								} else {
									selfParent.addClass(settings.success.class);
									selfLabel.children('i').attr("class", iconSuccess);
									if (settings.error.showText == true) {
										selfLabel.children('span:last-of-type').text(' '+settings.success.text);
									}
								}
								// console.log(data.exists);
							}
						},
						error: function(xhr) {
							// Saat terjadi kesalahan
							selfParent.addClass(settings.error.class);
							selfLabel.children('span:last-of-type').text(' '+settings.ajax.errorText);
							if (xhr.status === 0) {
								console.log('Ajax Error Status ['+xhr.status+']');
							}
						}
					});

				}

			});

			$(this).on('keypress',function (e) {
				var self = $(this);
				if (/[^a-zA-Z0-9\s@,._-]/i.test(String.fromCharCode(e.which))) {
	        		e.preventDefault();
	        	}
				if (self.hasClass("nospace") || self.attr("type") == "email" || self.attr("name").includes("email") || self.data('type') == "email") {
					if (e.which === 32) {
	        			return false;
	        		}
	        	}
	        	if (self.hasClass("digit")) {
	        		return /\d/.test(String.fromCharCode(e.keyCode));
	        	}
        	});

			$(this).on('keyup focusout',function (e) {
				var self = $(this);
				if (self.hasClass("textuppercase")) {
					self.val(self.val().toLocaleUpperCase());
				}
				if (self.hasClass("textlowercase")) {
					self.val(self.val().toLocaleLowerCase());
				}
				if (self.hasClass("textcapitalcase")) {
					self.val(toCapitalizeCase(self.val()));
				}
			});

			$(this).on("focusout", function() {
				warning = $(this).parents('form').find('.'+settings.warning.class).length;
				success = $(this).parents('form').find('.'+settings.success.class).length;
			 	changes = $(this).parents('form').find('.'+settings.changes.class).length;
			 	danger = $(this).parents('form').find('.'+settings.empty.class+', .'+settings.error.class+', .'+settings.match.class+', .'+settings.unsuit.class).length;

				if (((warning === 0) && (danger === 0)) && ((success > 0) || (changes > 0))) {
					$(this).parents('form').find(':submit').removeAttr('disabled');
				}
			});
		});
	}
}(jQuery));