package testobject;
// Generated 2016-5-20 23:45:10 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Bench generated by hbm2java
 */
@Entity
@Table(name = "bench", catalog = "superquant")
public class Bench implements java.io.Serializable {

	private String benchId;
	private String benchName;

	public Bench() {
	}

	public Bench(String benchId, String benchName) {
		this.benchId = benchId;
		this.benchName = benchName;
	}

	@Id

	@Column(name = "benchID", unique = true, nullable = false, length = 20)
	public String getBenchId() {
		return this.benchId;
	}

	public void setBenchId(String benchId) {
		this.benchId = benchId;
	}

	@Column(name = "benchName", nullable = false, length = 20)
	public String getBenchName() {
		return this.benchName;
	}

	public void setBenchName(String benchName) {
		this.benchName = benchName;
	}

}
