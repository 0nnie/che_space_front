
class WebUtils {

	static initBaseJS(_jsUrl:string) {
		const script = document.createElement('script');
		script.src = _jsUrl;
		//script.src = '/elandedu/assets/js/common.js'; // common.js 파일의 경로를 지정해야 합니다.
		script.async = true;
		document.body.appendChild(script);
		script.onload = () => {}
	}


	static hostnames:[string] = [
		"localhost"
	]
	static log (e : any) {
		if (this.hostnames.indexOf(location.hostname) > -1) {
			console.log(e)
		}
	}


	static goTop = () => {
		window.scrollTo({
			top : 0,
			behavior: 'smooth'
		})
	}



	getSubdomain() {
		/*console.log( location.path )
		console.log( location.pathname )
		console.log( location.origin )
		console.log( location.host )
		console.log( location.hostname )*/

		if (location.hostname.indexOf(".") > -1) {

			let subDomain = location.hostname.split('.').length >= 3 ? location.hostname.split(".")[0] : 'www'
			if (subDomain === "localhost" || !isNaN(Number(subDomain))) {
				subDomain = "www";
			}

			return subDomain;
			// var subDomain = location.hostname.split(".")[0];
			// if ( subDomain === "localhost" || !isNaN(subDomain) ) {
			// 	subDomain = "www";
			// }
			//
			// return subDomain;
		}

		// return location.hostname
		return "www"
	}

	/**
	 * 파라미터를 url 로 하는 url 에서 subdomain 추출
	 *
	 * @param _urlString
	 */
	getSubdomainWithURLString(_urlString :string) {
		let hostname = new URL(_urlString).hostname
		if (hostname.indexOf(".") > -1) {

			let subDomain = hostname.split('.').length >= 3 ? hostname.split(".")[0] : 'www'
			if (subDomain === "localhost" || !isNaN(Number(subDomain))) {
				subDomain = "www";
			}

			return subDomain;
		}

		return "www"
	}



	getParameter (strParamName: string) {
		var arrResult = null;
		if (strParamName) {
			arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
		}
		return arrResult && arrResult[1] ? decodeURIComponent(arrResult[1]) : "";
	}





	getParameterInt (strParamName:string ) :number {
		if (this.getParameter(strParamName) === "") {
			return 0;
		} else {
			return parseInt(this.getParameter(strParamName));
		}
	}


	serialize (obj:{[key:string]:string}) {
		let str = [];
		for (let p in obj)
			// eslint-disable-next-line no-prototype-builtins
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + obj[p]);
				// str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}




	scrollTo( _domId :string ) {

		const dom:Element | null = document.querySelector(_domId)
		if ( _domId == null ||  dom == null ) {
			_domId = "header"
		}

		if ( dom !== null && dom?.parentElement !== null ) {

			const rect = dom?.getBoundingClientRect()
			const rectParent = dom?.parentElement?.getBoundingClientRect()

			window.scrollTo({
				top: rectParent.top + rect.top,
				left: rectParent.left + rect.left,
				behavior: 'smooth'
			});
		}
	}

	static findCenter = (isFilter: boolean, code: string) => {
		let id = `${isFilter ? "filter" : "tab" }-${code}`
		let element = document.getElementById(id);
		element && this.centerTabItem(element, isFilter)
	}

	static centerTabItem = (target:HTMLElement, isFilter: boolean) => {
		const containerType = isFilter ? 'filter' : 'tab'
		const container = target.closest(`.${containerType}-slide`) as HTMLDivElement
		const wrapper = target.closest('.swiper-wrapper') as HTMLDivElement
		if (!wrapper || !container){
			return
		}
		const targetPosLeft = this.getPositionLeft(target)
		const targetPosWidth = target.offsetWidth
		const containerWidth = container.offsetWidth
		let newPosition = 0;
		let listWidth = 0;

		let slides = wrapper.querySelectorAll('.swiper-slide') as NodeListOf<HTMLElement>;
		slides.forEach(slide => {listWidth += slide.offsetWidth})
		const selectTargetPos = targetPosLeft + (targetPosWidth / 2);
		if (containerWidth < listWidth) {
			if (selectTargetPos <= containerWidth / 2) {
				newPosition = 0;
			} else if ((listWidth - selectTargetPos) <= containerWidth / 2) {
				newPosition = listWidth - containerWidth;
			} else {
				newPosition = selectTargetPos - containerWidth / 2;
			}
		}
		wrapper.style.transform = `translate3d(${-newPosition}px, 0, 0)`
		wrapper.style.transitionDuration = "500ms"
	}

	static getPositionLeft = (ele:HTMLElement) => {
		let offsetParent = ele.offsetParent;
		const elementRect = ele.getBoundingClientRect();
		let left = elementRect.left;
		if (offsetParent) {
			const parentRect = offsetParent.getBoundingClientRect();
			left = elementRect.left - parentRect.left;
		}

		return left;
	}


	/**
	 * 모바일인지 아닌지 판별
	 */
	static isMobile = (): boolean => {
		return window.matchMedia('(max-width: 1024px)').matches;
	};


	isDom ($_dom :string) :boolean {

		const tmp = document.querySelector($_dom);
		if (tmp !== null && tmp !== undefined) {
			return true;
		}

		return false;
	}

}
export default WebUtils;