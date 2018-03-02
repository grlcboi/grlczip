var download_base = 'https://garlic.wine'
var $idown;  // Keep it outside of the function, so it's initialized once.

function gen_download_path(path_bits){
	delim = '/'
	for (var i = 0; i < path_bits.length; i++) {
		console.log(arguments[i]);
	}
}

function download_url(path) {
	url = download_base + path
	if ($idown) {
		$idown.attr('src',url);
	} else {
		$idown = $('<iframe>', { id:'idown', src:url }).hide().appendTo('body');
	}
}

$(document).ready(function() {
	// handle method selection
	$('#select_method').change(function() {
		if (this.value == 'gpu') {
			// hide CPU stuff
			$('#select_cpu_arch').hide()
			// hide specific GPU stuff
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			// hide generic stuff
			$('#input_wallet').hide()
			$('#submit').hide()
			// display next required info
			$('#select_gpu_make').css('display','inline');
			
		} else if (this.value =='cpu') {
			// hide GPU stuff
			$('#select_gpu_make').hide()
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			// hide specific CPU stuff
			$('#select_cpu_arch').hide()
			// hide generic stuff
			$('#input_wallet').hide()
			$('#submit').hide()
			// display next required info
			$('#select_cpu_arch').css('display','inline');
		}
	});
	// handle GPU selection details
	$('#select_gpu_make').change(function() {
		if (this.value == 'nvidia') {
			$('#select_cuda_ver').css('display','inline');
			$('#cuda_info').css('display','inline'); // informational
			$('#input_wallet').hide()
			$('#submit').hide()
		} else {
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});
	$('#select_cuda_ver').change(function() {
		if (this.value != 'select') {
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});
	// handle CPU selection details
	$('#select_cpu_arch').change(function() {
		if (this.value != 'select') {
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});	

	// handle submission
	$('#submit').click(function() {
		path = []
		try{
			//if cpu
			if ( $('#select_method').val() == 'cpu') {
				path[path.length] = 'cpu'
				switch($('#select_cpu_arch').val()) {
					    case 'nehalem':
					        path[path.length] = 'nehalem'
					        break;
					    case 'westmere':
					        path[path.length] = 'westmere'
					        break;
					    case 'sandybridge':
					        path[path.length] = 'sandybridge'
					        break;
					    case 'haswell':
					        path[path.length] = 'haswell'
					        break;
					    case 'universal':
					        path[path.length] = 'universal'
					        break;
					    case 'select':
					        throw('Check CPU architecture!')
				}
				if ($('#input_wallet').val() == 'Enter GRLC Address') { throw('Check address!') }
				path[path.length] = $('#input_wallet').val()
			}
			//if gpu
			else if ($('#select_method').val() == 'gpu') {
				path[path.length] = 'gpu'
				//if nvidia
				if ( $('#select_gpu_make').val() == 'nvidia' ) {
					path[path.length] = 'nvidia'
					if ( $('#select_cuda_ver').val() == 'select' ) { throw('Check CUDA version!') }
					else if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
					path[path.length] = $('#select_cuda_ver').val() 
					path[path.length] = $('#input_wallet').val()
				}
				//if amd
				else if ( $('#select_gpu_make').val() == 'amd' ) {
					path[path.length] = 'amd'
					if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
					path[path.length] = $('#input_wallet').val()
				}
				else { throw('Check gpu make!') }
			}
			else { throw('Check method!') }
			gen_download_path(path)
		} catch (err) {
			alert(err)
		}
	})

	// makes address field pretty
	$('#input_wallet').click(function(){
		this.value = ''
	});
	// makes address field pretty
	$('#input_wallet').focusout(function(){
		if (!this.value) { this.value = 'Enter GRLC Address' }

	});
});	