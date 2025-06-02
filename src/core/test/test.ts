import axiosCaller from "@/common/utils/axios.caller";

class FileService {


    static getFileList = () => {
        return axiosCaller.get("http://www.hwlms.com:8080/my/test", {})
    }

}

export default FileService