package ecommerce.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "disk.upload")
public class DiskStorageProperties {
    private String basepath;

    public String getBasepath() {
        return basepath;
    }

    public void setBasepath(String basepath) {
        this.basepath = basepath;
    }
}


//package ecommerce.utils;
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.stereotype.Component;
//import org.springframework.context.annotation.Primary;
//
//import javax.annotation.PostConstruct;
//
//@Component
//@Primary
//@ConfigurationProperties(prefix = "disk.upload")
//public class DiskStorageProperties {
//    private String basepath;
//
//    public String getBasepath() {
//        return basepath;
//    }
//
//    public void setBasepath(String basepath) {
//        this.basepath = basepath;
//    }
//
//    @PostConstruct
//    public void logProperties() {
//        System.out.println("Basepath: " + basepath);
//    }
//}
//
