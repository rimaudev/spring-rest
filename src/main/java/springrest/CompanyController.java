package springrest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.google.common.collect.ImmutableMap.of;
import static org.springframework.beans.BeanUtils.copyProperties;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Company REST controller.
 */
@RestController
//@CrossOrigin
public class CompanyController {
    @Autowired
    private CompanyRepository repository;

    /**
     * Create a company.
     *
     * @param company Company object
     * @return Newly created company object
     */
    @RequestMapping(value = "/companies", method = POST, consumes = APPLICATION_JSON_VALUE)
    Company create(@Valid @RequestBody Company company) {
        return repository.save(company);
    }

    /**
     * List companies.
     *
     * @return List of Map with basic company information. Each Map object contains two keys that represent the "id"
     * and "name" of the company
     */
    @RequestMapping(value = "/companies", method = GET)
    List<Map<String, String>> listCompanies() {
        return repository.streamCompanies().map(
                company -> of("id", company.getId(), "name", company.getName())
        ).collect(Collectors.toList());
    }

    /**
     * Get company details.
     *
     * @param companyId company ID
     * @return Company object with details
     */
    @RequestMapping(value = "/companies/{companyId}", method = GET)
    Company getCompany(@PathVariable String companyId) {
        return repository.findOne(companyId);
    }

    /**
     * Update company detail.
     * <p>
     * The "updates" parameter contains values to update. Updates are done based on these rules:
     * </p>
     * <ul>
     * <li>"id" and "owners" properties will never be updated</li>
     * <li>Only non-null values will be updated</li>
     * </ul>
     *
     * @param company Company object to update
     * @param updates Company object that contains values to update
     * @return Updated company object
     */
    @RequestMapping(value = "/companies/{companyId}", method = PUT, consumes = APPLICATION_JSON_VALUE)
    Company update(@Valid @PathVariable("companyId") Company company, @RequestBody Company updates) {
        List<String> ignore = new ArrayList<>();

        // never update id, owners
        ignore.add("id");
        ignore.add("owners");

        // update all other properties if not null
        if (updates.getName() == null) {
            ignore.add("name");
        }

        if (updates.getAddress() == null) {
            ignore.add("address");
        }

        if (updates.getCity() == null) {
            ignore.add("city");
        }

        if (updates.getCountry() == null) {
            ignore.add("country");
        }

        if (updates.getEmail() == null) {
            ignore.add("email");
        }

        if (updates.getPhoneNumber() == null) {
            ignore.add("phoneNumber");
        }

        copyProperties(updates, company, ignore.toArray(new String[ignore.size()]));

        return repository.save(company);
    }

    /**
     * Add one or more owner to the company.
     *
     * @param company Company to add owner
     * @param owners  Set of owners
     * @return Updated list of owners for the company
     */
    @RequestMapping(value = "/companies/{companyId}/addOwner", method = PUT, consumes = APPLICATION_JSON_VALUE)
    Set<String> addOwner(@Valid @PathVariable("companyId") Company company, @RequestBody Set<String> owners) {
        company.getOwners().addAll(owners);
        Company saved = repository.save(company);
        return saved.getOwners();
    }

}
