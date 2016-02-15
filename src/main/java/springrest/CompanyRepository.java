package springrest;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

/**
 * Company Spring Data JPA repository.
 */
@Repository
public interface CompanyRepository extends PagingAndSortingRepository<Company, String> {
    /**
     * Get a stream of companies.
     *
     * @return Stream of companies
     */
    @Query("SELECT c FROM Company c ORDER BY c.name")
    Stream<Company> streamCompanies();
}
