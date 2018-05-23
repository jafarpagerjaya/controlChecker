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
				url: 'null',
				type: 'get',
				errorText: 'Gagal Melakukan Ajax'
			},
			chained: {
				enabled: false,
				id: null,
				activeOnId: null
			}
		}, options);

		// private functions
		function formGroupControl() {
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

					if (settings.formId !== null) {
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
		
		function iconControl() {
			var $this = $(this);
				$this.children('i').remove();
				if (settings.icon.position === 'after') {
					$this.append(' '+thisIcon);
				} else {
					$this.prepend(thisIcon+' ');
				}
			return $this;
		}

		var warning,
			success,
			changes,
			danger;
		function onFocusOut() {
			warning = thisFrom.find('.'+settings.warning.class).length;
			success = thisFrom.find('.'+settings.success.class).length;
		 	changes = thisFrom.find('.'+settings.changes.class).length;
		 	danger = thisFrom.find('.'+settings.empty.class+', .'+settings.error.class+', .'+settings.match.class+', .'+settings.unsuit.class).length;

			if (((warning === 0) && (danger === 0)) && ((success > 0) || (changes > 0))) {
				thisFrom.find(':submit').removeAttr('disabled');
			}

		}

		// init parent class
		if (settings.cssFramework == 'sui') {
			settings.parentClass = 'field';
		}

		// init form control
		var thisFrom = $("#"+settings.formId);
			if (settings.formId === null) {
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
		if (settings.icon.enabled === true) {
			var thisIcon = "<i />",
				iconSuccess = settings.icon.success,
				iconWarning = settings.icon.warning,
				iconEmpty = settings.icon.empty,
				iconError = settings.icon.error,
				iconUnmatch = settings.icon.unmatch;
				iconUnsuit = settings.icon.unsuit;
		}

		// init modal control
		if (settings.modal.enabled === true) {
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

		return this.each(function() {
			var selfIdValue,
				storedValue,
				storedChainedVal,
				storedChainedName,
				storedLabel,
				storedLabelHtml;

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

				if (settings.modal.enabled !== true) {
					formGroupControl.call(self);
				}

				if (selfIdValue !== self.parents('form').attr('id')) {
					selfIdValue = self.parents('form').attr('id');
					storedValue = self.val();
					if (storedLabel === true) {
						storedLabelHtml = self.parents('.'+settings.parentClass).find('label').html();
					}
				}

				if (settings.chained.enabled === true) {
					if ($('input#'+settings.chained.activeOnId+', select#'+settings.chained.activeOnId).length === 0) {
						console.log('undefined chained activeOnId');	
						return false;
					}
					if ($('input#'+settings.chained.id+', select#'+settings.chained.id).length === 0) {
						console.log('undefined chained id');	
						return false;
					}
					if (self.attr('id') !== settings.chained.activeOnId) {
						if (self.attr('id') !== settings.chained.id) {
							return false;
						}
					}
					var currChained;
					switch(self.attr('id')) {
						case settings.chained.id:
							currChained = $('#'+settings.chained.activeOnId);
						break;
						default: 
							currChained = $('#'+settings.chained.id);
						break;
					}
					storedChainedVal = currChained.val();
					storedChainName = currChained.attr("name");
					// console.log('chained name = '+storedChainName+' chained value = '+storedChainedVal);
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
					// console.log('Data Kosong');
					selfParent.removeClass(settings.unsuit.class+' '+settings.match.class+' '+settings.changes.class+' '+settings.error.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.empty.class);
					selfLabel.children('i').attr("class", iconEmpty);
					if (settings.empty.showText == true) {
						selfLabel.children('span:last-of-type').text(' '+settings.empty.text);
					}
					return false;
				}

				if (self.val().length < selfMinLength) {
					var selfLeftLength = selfMinLength - self.val().length;
					// console.log('Data kurang dari minimun panjang karater');
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
						// console.log(settings.match.matchThisId);
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
								selfLabel.children('span:last-of-type').text(' '+settings.match.unmatchText);
							}
							selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class).addClass(settings.match.class);
							selfLabel.children('i').attr("class", iconUnmatch);
							self.next('span.glyphicon').removeAttr('style');
							selfLabel.show();
							return false;
						}
						selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.match.class).addClass(settings.changes.class);
						selfLabel.children('span:last-of-type').text(' '+settings.match.matchText);
						selfLabel.children('i').removeClass(iconUnmatch);
						selfLabel.hide();
						self.next('span.glyphicon').css('top','0');
						return false;
					break;
					case settings.match.matchToId: // matching reference field
						// console.log(settings.match.matchToId);
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
							if (matchLabel.length < 1) {
								matchParent.prepend('<label />');
								matchParent.children('label').text(toCapitalizeCase(selfType));
								matchLabel = matchParent.children('label');
								matchLabel = iconControl.call(matchLabel);
								var matchSpanLength = matchLabel.find('span[data-type="' + selfType + '"]').length;
								if (matchSpanLength < 1) {
									matchLabel.append('<span />');
									matchLabel.children('span').last().attr("data-type", selfType);
								}
							}
							if (settings.match.showText == true) {
								matchLabel.children('span:last-of-type').text(' '+settings.match.unmatchText);
							}
							matchParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.changes.class).addClass(settings.match.class);
							matchLabel.children('i').attr("class", iconUnmatch);
							matchTo.next('span.glyphicon').removeAttr('style');
							matchLabel.show();
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
					// console.log('Data sama dengan yang ada di storedValue');
					selfParent.removeClass(settings.unsuit.class+' '+settings.changes.class+' '+settings.success.class+' '+settings.warning.class+' '+settings.empty.class+' '+settings.error.class);
					selfLabel.children('span:last-of-type').remove();
					if (self.siblings().is('label')) {
						selfLabel.html(storedLabelHtml);
					}
					return false;
				}

				if (selfTable === undefined) {
					// console.log('Data Berubah');
					selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.success.class+' '+settings.warning.class).addClass(settings.changes.class);
					if (settings.changes.showText == true) {
						selfLabel.children('span:last-of-type').text(' '+settings.changes.text);
					} else {
						selfLabel.children('span:last-of-type').remove();
					}
					if (settings.chained.enabled == true) {
						if (self.attr('id') == settings.chained.id) {
							$('#'+settings.chained.activeOnId).trigger('change');
						}
					}
					return false;				
				}

				if (selfTable !== undefined) {

					selfVal = self.val();
					selfParent.removeClass(settings.unsuit.class+' '+settings.empty.class+' '+settings.error.class+' '+settings.success.class+' '+settings.changes.class+' '+settings.warning.class);
					selfLabel.text(toCapitalizeCase(selfType));
					selfLabel = iconControl.call(selfLabel);
					selfLabel.append('<span />');
					selfLabel.children('span').last().attr("data-type", selfType);

					$.ajax({
						url: settings.ajax.url,
						type: settings.ajax.type,
						dataType: 'json',
						data: {
							field: selfType,
							table: selfTable,
							value: selfVal,
							prevColumnName: storedChainedName,
							prevColumnValue: storedChainedVal
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
								onFocusOut.call(self);
								// console.log(data.exists);
							}
						},
						error: function(xhr) {
							// Saat terjadi kesalahan
							selfParent.addClass(settings.error.class);
							selfLabel.children('span:last-of-type').text(' '+settings.ajax.errorText);
							solution = undefined;
							if (xhr.status === 0) {
								solution = 'Check Network Connection';
							}
							if (xhr.status === 200) {
								solution = 'Check Server Returns Format';
							}
							if (xhr.status === 404) {
								solution = 'Check Ajax Url';
							}
							if (xhr.status === 500) {
								solution = 'Check Internal Server';
							}
							console.log('Ajax Error Status ['+xhr.status+'] => '+xhr.statusText+' => Solution '+solution);
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
				onFocusOut.call($(this));
			});
		});
	}
}(jQuery));