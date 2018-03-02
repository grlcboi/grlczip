var download_base = 'https://garlic.wine'
var $idown;  // Keep it outside of the function, so it's initialized once.
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
		try{
			//if cpu
			if ( $('#select_method').val() == 'cpu') {
				if ($('#input_wallet').val() == 'Enter GRLC Address') { throw('Check address!') }
				download_url('/download/cpu/' + $('#input_wallet').val() + '/miner.zip')


				switch($('#select_cpu_arch').val()) {
					    case 'nehalem':
					        alert('nehalem')
					        break;
					    case 'westmere':
					        alert('westmere')
					        break;
					    case 'sandybridge':
					        alert('sandybridge')
					        break;
					    case 'haswell':
					        alert('haswell')
					        break;
					    case 'universal':
					        alert('universal')
					        break;
					    default:
					        throw('Check CPU architecture!')
				}
			}
			//if gpu
			else if ($('#select_method').val() == 'gpu') {
				//if nvidia
				if ( $('#select_gpu_make').val() == 'nvidia' ) {
					if ( $('#select_cuda_ver').val() == 'select' ) { throw('Check CUDA version!') }
					else if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
					download_url('/download/nvidia/'+ $('#select_cuda_ver').val() + '/' + $('#input_wallet').val() + '/miner.zip')
				}
				//if amd
				else if ( $('#select_gpu_make').val() == 'amd' ) {
					if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
				}
				else { throw('Check gpu make!') }
				download_url('/download/amd/' + $('#input_wallet').val() + '/miner.zip')
			}
			else { throw('Check method!') }

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