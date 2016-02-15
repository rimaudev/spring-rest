package springrest.converters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import springrest.Company;
import springrest.CompanyRepository;

/**
 * Converter to load company from repository based on company ID.
 */
@Component
public class StringToCompanyConverter implements Converter<String, Company> {
    @Autowired
    private CompanyRepository repository;

    @Override
    public Company convert(String companyId) {
        return repository.findOne(companyId);
    }
}
